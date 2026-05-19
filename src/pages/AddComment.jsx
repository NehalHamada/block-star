import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Header, Button } from "../components";
import { FaStar, FaImage } from "react-icons/fa";
import { MessageSquareText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { addReview } from "../api/services/reviews.api.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const AddComment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const location = useLocation();
  const productId = location.state?.productId;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      rating: 0,
      image: null,
      comment: "",
    },
  });

  const reviewMutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["product", String(productId)] });
      toast.success(t("reviews.reviewSuccess"));
      navigate(-1);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || t("reviews.reviewError");
      toast.error(errorMessage);
    },
  });

  const breadcrumbs = [
    { label: t("common.home"), path: "/" },
    { label: t("reviews.breadcrumb"), path: null },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue("image", null);
    setImagePreview(null);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("rating", data.rating);
      formData.append("comment", data.comment);
      if (data.name) {
        formData.append("name", data.name);
      }
      if (data.image) {
        formData.append("image", data.image);
      }

      await reviewMutation.mutateAsync(formData);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <div className="w-full">
      <Header breadcrumbs={breadcrumbs} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-noto">
            {t("reviews.title")}
          </h1>
          <p className="text-gray-600 leading-relaxed">{t("reviews.desc")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              {t("reviews.nameLabel")}
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: t("reviews.nameRequired"),
                minLength: {
                  value: 3,
                  message: t("reviews.nameMinLength"),
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50  ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("reviews.namePlaceholder")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 ">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block  text-gray-700 font-medium mb-3">
              {t("reviews.ratingLabel")}
            </label>
            <Controller
              name="rating"
              control={control}
              rules={{
                required: t("reviews.ratingRequired"),
                min: { value: 1, message: t("reviews.ratingSelect") },
              }}
              render={({ field }) => (
                <div>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].reverse().map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => field.onChange(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <FaStar
                          size={40}
                          className={`${
                            star <= (hoveredRating || field.value)
                              ? "text-primary"
                              : "text-gray-300"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-2 ">
                      {errors.rating.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block  text-gray-700 font-medium mb-2">
              {t("reviews.imageLabel")}
            </label>
            <div className="relative">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="w-full flex items-center justify-center gap-3 px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors bg-transparent"
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-40 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeImage();
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <FaImage size={24} className="text-gray-400" />
                    <span className="text-gray-500">
                      {t("reviews.uploadImage")}
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Comment Textarea */}
          <div>
            <label
              htmlFor="comment"
              className="block  text-gray-700 font-medium mb-2"
            >
              {t("reviews.commentLabel")}
            </label>
            <textarea
              id="comment"
              {...register("comment", {
                required: t("reviews.commentRequired"),
                minLength: {
                  value: 10,
                  message: t("reviews.commentMinLength"),
                },
              })}
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50  resize-none ${
                errors.comment ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("reviews.commentPlaceholder")}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1 ">
                {errors.comment.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-lg text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageSquareText size={20} />
            {isSubmitting
              ? t("reviews.submittingReview")
              : t("reviews.submitReview")}
          </Button>
        </form>
      </div>
    </div>
  );
};
