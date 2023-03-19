import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority.js';
import { Status } from '../enums/Status.js';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title mandatory')
    .trim()
    .isString()
    .withMessage('Title must be in text format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is mandatory')
    .isString()
    .withMessage('Date must be a valid date format'),
  body('description')
    .trim()
    .isString()
    .withMessage('Description must be in text format'),
  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage('Priority must be one of this value: "normal", "high", "low"'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage(
      'Priority must be one of this value: "todo", "inProgress", "completed"'),
];

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is mandatory')
    .trim()
    .isString()
    .withMessage('Id must be a valid uuid format'),
  body('status')
    .trim()
    .isIn([
      Status.todo, Status.inProgress, Status.completed
    ])
    .withMessage(
      'Priority must be one of this value: "todo", "inProgress", "completed"')
];
