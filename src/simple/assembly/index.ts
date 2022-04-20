import { logging, u128 } from "near-sdk-as";
import { News, allNews } from "./model";

  //Create and Publish a News
export function publishNews(text: string): News {
  logging.log("A scratch to the history of the future!");
  return News.publish(text);
}

  //Take a Look to Archieve
export function bringNews(id: u32): News {
  logging.log("You can send your thanks to the Newsman using 'sendGratitude' function!");
  return News.bringFromArchieve(id);
}

  //Read A News
export function readNews(): News[] {
  assert(allNews.length > 0, "Nothing remarkable happens in these days.");
  return News.readANews();
}

  //Delete Your News
export function deleteNews(id: u32): void {
  logging.log("Looking forward to your updated news!");
  News.deleteANews(id);
}

  //Send A Gift
  export function sendGratitude(newsman: string, amount: u128): void {
  News.donate(newsman, amount);
} 


// ID girerek haberin sender ına donate yapılan fonksiyon eklenebilir.
// Haberi silen fonksiyon olabilir.
// Her hesaba he repochta maksimum haber girişi kontrolü yapılabilir.
//timestamp kullanara readRecentNews fonksiyonu yaz.