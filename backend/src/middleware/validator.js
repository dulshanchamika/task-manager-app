const { body, validationResult } = require('express-validator');

const validateTask = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('description').optional().trim(),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH']).withMessage('Invalid priority'),
  body('status').optional().isIn(['PENDING', 'COMPLETED']).withMessage('Invalid status'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateTask };
