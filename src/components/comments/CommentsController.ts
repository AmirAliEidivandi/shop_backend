import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../services/CatchAsync";
import CommentTransformer from "./CommentTransformer";
import CommentMongoRepository from "./repositories/CommentMongoRepository";
import ICommentRepository from "./repositories/ICommentRepository";

export default class CommentsController {
    private readonly commentsRepository: ICommentRepository;
    private readonly commentTransformer: CommentTransformer;
    constructor() {
        this.commentsRepository = new CommentMongoRepository();
        this.commentTransformer = new CommentTransformer();
        this.index = this.index.bind(this);
    }
    public index = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const perPage = 10;
        const page = req.query.page || 1;
        const offset = ((page as number) - 1) * perPage;
        const comments = await this.commentsRepository.findMany({}, ["user", "product"], { perPage, offset });
        const totalComments = await this.commentsRepository.findMany({});
        const transformedComments = this.commentTransformer.collection(comments);

        res.status(200).json({
            data: transformedComments,
            _metadata: {
                page,
                perPage,
                totalPages: Math.ceil(totalComments.length / perPage),
                totalItems: totalComments.length,
            },
        });
    });
}
