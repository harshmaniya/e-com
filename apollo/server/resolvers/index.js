import { brandResolver } from "./brand.resolver";
import { categoryResolver } from "./category.resolver";
import { colorResolver } from "./colors.resolver";
import { productResolver } from "./products.resolver";

import { merge } from "lodash";

const resolvers = merge(productResolver, brandResolver, categoryResolver, colorResolver)

export default resolvers