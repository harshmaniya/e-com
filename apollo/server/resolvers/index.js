import { brandResolver } from "./brand.resolver";
import { categoryResolver } from "./category.resolver";
import { colorResolver } from "./color.resolver";
import { productResolver } from "./product.resolver";
import { userResolver } from "./user.resolver";
import { cartResolver } from "./cart.resolver";
import { wishlistResolver } from "./wishlist.resolver";
import { orderResolvers } from "./order.resolver";

import { merge } from "lodash";

const resolvers = merge(productResolver, brandResolver, categoryResolver, colorResolver, userResolver, cartResolver, wishlistResolver, orderResolvers)

export default resolvers