import { faker } from "@faker-js/faker";
import AdviceToBuy from "../../components/comments/model/AdviceToBuy";
import CommentStatus from "../../components/comments/model/CommentStatus";
import IComment from "../../components/comments/model/IComment";
import Comment from "../../components/comments/model/Comment";
import { create as createUser } from "./UserFactory";
import { create as createProduct } from "./ProductFactory";

faker.setLocale("fa");
export async function create(count: number = 1, params?: Partial<IComment>) {
    const comments: IComment[] = [];
    for (let index = 1; index <= count; index++) {
        const user = await createUser(1);
        const product = await createProduct(1);
        const defaultParams = {
            user: user[0]._id,
            product: product[0]._id,
            title: faker.lorem.words(5),
            body: faker.lorem.paragraph(),
            isBuyer: faker.datatype.boolean(),
            adviceToBuy: faker.helpers.arrayElement([AdviceToBuy.YES, AdviceToBuy.NO, AdviceToBuy.NOT_SURE]),
            status: faker.helpers.arrayElement([CommentStatus.APPROVED, CommentStatus.PENDING, CommentStatus.REJECTED]),
        };
        const commentParams = { ...defaultParams, ...params };
        const newComment = new Comment(commentParams);
        await newComment.save();
        comments.push(newComment);
    }
    return comments;
}
