import { context, logging } from "near-sdk-as";
import { News, allNews, recentNews } from "./model";

export function init() : void {}

export function publishNews(text: string): void {
  //Create and Share a News
  const news = new News(text);
  allNews.push(news);
  logging.log("You left a scratch to the history. Thanks!")
}

export function readNews(): Array<News> {
  //Read Recent News
  let i = allNews.length - 1 ;
  while (allNews[i].date - context.epochHeight > 2) {
    recentNews.push(allNews[i]);
    i--;
  }
  assert(recentNews.length > 0, "Nothing remarkable happens in these days.")
  return recentNews;
}