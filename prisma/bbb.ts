/**
 * Express Asynchronous Request Handler Wrapper
 * 
 * Purpose: Eliminates boilerplate try/catch blocks in asynchronous Express controllers
 * by automatically catching rejected promises and passing them to the next middleware.
 */

import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * A higher-order function that wraps an asynchronous Express route handler or middleware.
 * 
 * @param fn The asynchronous route handler function to execute.
 * @returns A standard Express middleware function signature.
 */
export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // 1. fn(req, res, next) executes your controller code.
    // 2. Promise.resolve() safely wraps the result into a Promise, handling both sync and async outcomes.
    // 3. .catch(next) catches any thrown error or rejection and passes it straight to next(error).
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/* ==========================================================================
   Detailed Code Breakdown
   ===========================================================================
   
   1. Higher-Order Function (HOF):
      `asyncHandler` accepts an Express route handler (`fn`) as its argument and 
      instantly returns a *new* anonymous function wrapper.
      
   2. Signature Compatibility:
      Express routes require handlers with the signature `(req, res, next)`. The 
      returned function implements exactly this signature, making it fully 
      interoperable with any standard Express route definition (e.g., app.get('/', asyncHandler(...))).

   3. Safe Promise Resolution via `Promise.resolve()`:
      Async functions in JavaScript automatically return a Promise. `Promise.resolve()` 
      guarantees that whatever `fn` outputs is treated uniformly as a resolved Promise. 
      If `fn` throws a standard runtime error or rejects an asynchronous task, it is converted 
      into a catchable promise state.

   4. Clean Error Propagation:
      `.catch(next)` is a concise shorthand for `.catch((error) => next(error))`. 
      By routing the error straight to `next()`, Express skips all remaining standard 
      routes and jumps directly to your configured global error-handling middleware.
*/

/* ==========================================================================
   Practice Questions & Coding Challenges
   ==========================================================================

   CHALLENGE 1: Refactor to use asyncHandler
   --------------------------------------------------------------------------
   Rewrite the following standard Express route handler using the `asyncHandler` 
   implemented above so that the explicit try/catch block is completely removed.

   ```typescript
   app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
     try {
       const user = await UserService.findById(req.params.id);
       if (!user) {
         return res.status(404).json({ message: 'User not found' });
       }
       res.json(user);
     } catch (error) {
       next(error);
     }
   });
   ```

   CHALLENGE 2: Behavioral Analysis
   --------------------------------------------------------------------------
   What would happen if an error is thrown synchronously *before* an await keyword
   inside a function wrapped by `asyncHandler`? 
   
   Example:
   ```typescript
   app.get('/test', asyncHandler(async (req, res, next) => {
     throw new Error("Instant sync crash!");
     const data = await fetchSomeData();
     res.send(data);
   }));
   ```
   Will the Node application crash, or will the error be handled gracefully? Why?

   CHALLENGE 3: Architectural Design
   --------------------------------------------------------------------------
   Why does the wrapper use `Promise.resolve(fn(req, res, next))` instead of simply
   marking the wrapper function itself as async and awaiting the call, like this?
   
   ```typescript
   return async (req, res, next) => {
     try {
       await fn(req, res, next);
     } catch (err) {
       next(err);
     }
   };
   ```
   (Hint: Think about performance, non-async handlers, and standard execution trees).
*/