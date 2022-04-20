import {PersistentVector, context} from "near-sdk-as";


@nearBindgen
export class News {
    sender: string;
    date: u64;
    constructor(public text: string) {
        this.sender = context.sender;
        this.date = context.epochHeight;
    }
}

export const allNews = new PersistentVector<News>("v");
export const recentNews = new Array<News>();
