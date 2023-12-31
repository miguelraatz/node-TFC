import { Request, Router, Response, NextFunction } from 'express';
import MatchModel from '../models/MatchModel';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import ValidateToken from '../middlewares/ValidateToken';
import TokenGeneratorJwt from '../services/TokenGeneratorJwt';
import TeamModel from '../models/TeamModel';

const matchModel = new MatchModel();
const teamModel = new TeamModel();
const matchService = new MatchService(matchModel, teamModel);
const matchController = new MatchController(matchService);
const tokenGenerator = new TokenGeneratorJwt();
const validateToken = new ValidateToken(tokenGenerator);

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => validateToken.validateToken(req, res, next),
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => validateToken.validateToken(req, res, next),
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => validateToken.validateToken(req, res, next),
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
