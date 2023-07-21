import redis,{createClient} from "redis"
import * as dotenv from "dotenv";
dotenv.config();
const client= createClient({url:process.env.RDURL})

try {
    client.connect();
    console.log("connected to redis");
  } catch (error) {
    console.log(error);
  }

  export default client