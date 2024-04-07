import Admin from '../models/Admin.js';
import Learner from '../models/Learner.js';
import Mentor from '../models/Mentor.js';

const roles = { learner: Learner, mentor: Mentor, admin: Admin };

export { roles };
