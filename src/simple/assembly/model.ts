import {context, PersistentUnorderedMap, math, storage, logging, u128, ContractPromiseBatch } from "near-sdk-as";

export const allNews = new PersistentUnorderedMap<u32, News>("allNews");  

@nearBindgen
export class News {
    id: u32;
    sender: string;
    date: u64;

    constructor(public text: string) {
        this.id = math.hash32<string>(text);
        this.sender = context.sender;
        this.date = context.blockTimestamp;
    }

    static publish(text: string): News {
        const news = new News(text);
        allNews.set(news.id, news);
        return news;
    }

    static bringFromArchieve(id: u32): News {
        return allNews.getSome(id);
    }

    static readANews(): News[] {
        let start: u32 = 0;
        return allNews.values(start, allNews.length);
    }

    static deleteANews(id: u32): void {
        const news = allNews.getSome(id);
        assert(news.sender == context.sender, "It is not your news!")
        allNews.delete(id);
    }

    static donate(newsman: string, amount: u128): void {
        assert(context.accountBalance >= amount, "Your balance is not enough!");
        logging.log(`Comolokko! ${context.attachedDeposit.toString()} NEAR sent`);
        ContractPromiseBatch.create(newsman).transfer(amount);
    }
}