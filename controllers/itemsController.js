import Item from "../models/itemsModel.js";

export const getItem = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addItem = async (req, res) => {
  console.log("addItem is called");
  console.log(req.body);
  try {
    const {
      name,
      category,
      type,
      color,
      description,
      price,
      detail,
      highlights,
      size,
    } = req.body;

    // Check for required fields
    if (!name || !category || !type || !color || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Process file uploads
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }

    const newItem = await Item.create({
      name,
      category,
      type,
      color,
      description,
      price,
      detail,
      highlights: highlights ? highlights.split(",") : [],
      size: size ? size.split(",") : [],
      image: images,
    });

    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateItem = async (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);
  const updateData = req.body;
  console.log(updateData);

  try {
    // Find the item by ID and update it
    const updatedItem = await Item.findByIdAndUpdate(itemId, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Send the updated item as a response
    return res
      .status(200)
      .json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/* DELETE Request handler */
export const deleteItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    // Find the item by ID and delete it
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Send a success response
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
