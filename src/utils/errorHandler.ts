import express from 'express';

// Wrap async functions to handle errors properly
export const asyncHandler = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);