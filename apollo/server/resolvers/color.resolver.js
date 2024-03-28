import { Color } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticatedAdmin } from '@/apollo/server/utils/middleware';

// done
const addColor = combineResolvers(isAuthenticatedAdmin, async (_, { input }) => {
  console.log("🚀 ~ addColor ~ input:", input[0])
  try {
    
    input.forEach(async (element) => {

      const allColors = await Color.findOne({ $or: [{ name: element.name }, { hexCode: element.hexCode }] });
      if (!allColors) {
        await Color.create({ name: element.name, hexCode: element.hexCode });
      }

    });
    return "Color added successfully!";
  } catch (error) {
    console.error("Error adding color:", error);
    return new Error("Failed to add color");
  }
});

// done
const getAllColors = async () => {
  try {
    // Fetch all colors
    const allColors = await Color.find();
    if (!allColors) return new Error("colors not found!");
    console.log("Fetched colors:", allColors);

    return allColors;
  } catch (error) {
    console.error("Error fetching colors:", error.message);
    return new Error("Failed to fetch colors");
  }
};

// done
const isColorExist = async (_, { input }) => {
  try {
    const { name, hexCode } = input;
    const allColors = await Color.findOne({ $or: [{ name: name }, { hexCode: hexCode }] });
    if (!allColors) return "NOT_FOUND";
    return "THIS_COLOR_ALREADY_EXISTS";
  } catch (error) {
    console.error("Error fetching colors:", error.message);
    return new Error("Failed to fetch colors");
  }
};

// done
const updateColor = combineResolvers(isAuthenticatedAdmin, async (_, { input }) => {
  try {
    const { _id, ...rest } = input;

    // Data validation
    if (!_id || (!rest.name && !rest.hexCode)) {
      return new Error("Invalid update input.");
    }

    // Update color
    const updatedColor = await Color.findByIdAndUpdate(_id, { ...rest }, { new: true });
    if (!updatedColor) {
      return new Error("Color not found");
    }
    console.log("Updated color:", updatedColor);

    return updatedColor;
  } catch (error) {
    console.error("Error updating color:", error.message);
    return new Error("Failed to update color");
  }
});

// done
const deleteColor = combineResolvers(isAuthenticatedAdmin, async (_, { _id }) => {
  try {
    // Delete color
    const deletedColor = await Color.findByIdAndDelete(_id);
    if (!deletedColor) {
      return "Color not found";
    }
    console.log("Deleted color:", deletedColor);

    return "Color deleted successfully";
  } catch (error) {
    console.error("Error deleting color:", error.message);
    return new Error("Failed to delete color");
  }
});

export const colorResolver = {
  Query: {
    getAllColors
  },
  Mutation: {
    addColor,
    updateColor,
    deleteColor,
    isColorExist
  }
};
