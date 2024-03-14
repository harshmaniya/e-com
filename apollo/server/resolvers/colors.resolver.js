import { Color } from "@/lib/models";

const addColor = async (_, { input }) => {
  try {
    const { name, hexCode } = input;

    // Data validation
    if (!name || !hexCode) {
      throw new Error("Color name and hex code are required.");
    }

    // Check if color already exists
    const existingColor = await Color.findOne({ name, hexCode });
    if (existingColor) {
      throw new Error("Color already exists!");
    }

    // Create new color
    const newColor = await Color.create({ name, hexCode });
    console.log("New color created:", newColor);

    return newColor;
  } catch (error) {
    console.error("Error adding color:", error);
    throw new Error("Failed to add color");
  }
};

const getAllColors = async () => {
  try {
    // Fetch all colors
    const allColors = await Color.find();
    console.log("Fetched colors:", allColors);

    return allColors;
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw new Error("Failed to fetch colors");
  }
};

const updateColor = async (_, { input }) => {
  try {
    const { _id, name, hexCode } = input;

    // Data validation
    if (!_id || (!name && !hexCode)) {
      throw new Error("Invalid update input.");
    }

    // Update color
    const updatedColor = await Color.findByIdAndUpdate(_id, { name, hexCode }, { new: true });
    if (!updatedColor) {
      throw new Error("Color not found");
    }
    console.log("Updated color:", updatedColor);

    return updatedColor;
  } catch (error) {
    console.error("Error updating color:", error);
    throw new Error("Failed to update color");
  }
};

const deleteColor = async (_, { _id }) => {
  try {
    // Delete color
    const deletedColor = await Color.findByIdAndDelete(_id);
    if (!deletedColor) {
      throw new Error("Color not found");
    }
    console.log("Deleted color:", deletedColor);

    return deletedColor;
  } catch (error) {
    console.error("Error deleting color:", error);
    throw new Error("Failed to delete color");
  }
};

export const colorResolver = {
  Query: {
    getAllColors
  },
  Mutation: {
    addColor,
    updateColor,
    deleteColor
  }
};
