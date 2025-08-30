import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { menuServices } from "../../Services/MenuServices";

const CLOUDINARY_CLOUD_NAME = "dnhvrcls9";
const UPLOAD_PRESET = "KickOff";

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    prices: { medium: "", large: "" },
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch current item data
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await menuServices.getItemById(id);
        setFormData({
          category: res.data.category,
          name: res.data.name,
          description: res.data.description,
          prices: {
            medium: res.data.prices.medium,
            large: res.data.prices.large,
          },
          image: res.data.image,
        });
      } catch (err) {
        toast.error("Failed to fetch menu item.");
        console.error(err);
      }
    };
    fetchItem();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "medium" || name === "large") {
      setFormData((prev) => ({
        ...prev,
        prices: { ...prev.prices, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const form = new FormData();
    form.append("file", imageFile);
    form.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: form,
        }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Image upload error:", err);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, description, prices } = formData;
    const { medium, large } = prices;

    // Validate required fields
    if (!name || !description || !medium || !large) {
      toast.error("Please fill all the fields.");
      setLoading(false);
      return;
    }

    const mediumPrice = parseFloat(medium);
    const largePrice = parseFloat(large);

    // Validate positive numbers
    if (isNaN(mediumPrice) || mediumPrice <= 0) {
      toast.error("Medium price must be a positive number!");
      setLoading(false);
      return;
    }
    if (isNaN(largePrice) || largePrice <= 0) {
      toast.error("Large price must be a positive number!");
      setLoading(false);
      return;
    }

    // Upload image if changed
    const uploadedImageUrl = await uploadImageToCloudinary();
    if (!uploadedImageUrl && !formData.image) {
      toast.error("Image upload failed.");
      setLoading(false);
      return;
    }

    const updatedItem = {
      category: formData.category,
      name: formData.name,
      description: formData.description,
      prices: { medium: mediumPrice, large: largePrice },
      image: uploadedImageUrl || formData.image,
    };

    try {
      await menuServices.updateItem(id, updatedItem);
      toast.success("Menu item updated successfully!");
      navigate("/menu");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update menu item."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-item-container">
      <h2>Edit Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Medium Price:
          <input
            type="number"
            name="medium"
            value={formData.prices.medium}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </label>

        <label>
          Large Price:
          <input
            type="number"
            name="large"
            value={formData.prices.large}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </label>

        <label>
          Image:
          <input type="file" onChange={handleFileChange} />
        </label>

        {formData.image && !imageFile && (
          <img
            src={formData.image}
            alt="Current"
            style={{ width: "150px", marginTop: "10px" }}
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Item"}
        </button>
      </form>
    </div>
  );
};

export default EditItem;
