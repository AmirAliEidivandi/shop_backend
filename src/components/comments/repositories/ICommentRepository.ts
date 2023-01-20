import IRepository from "../../../components/contracts/IRepository";
import IComment from "../model/IComment";

export default interface ICommentRepository extends IRepository<IComment> {
    findByProduct(productID: string, relations?: string[]): Promise<IComment[]>;
}
