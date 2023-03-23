import { db } from "./db";
export default async function existInDb(where: string, equals: any) {
  let result: number;
  await db
    .table("magazzino")
    .where(where)
    .equals(equals)
    .count()
    .catch((err) => {
      console.log(err);
      return 0;
    })
    .then((c) => {
      result = c;
    });
  if (result > 0) {
    return true;
  }
  return false;
}
