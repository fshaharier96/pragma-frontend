import { FiTag } from "react-icons/fi";
import EntityFormPage from "../../components/EntityFormPage";

const fields = [
  { name: "name", label: "Category name", placeholder: "Enter category name", required: true, fullWidth: true },
  { name: "slug", label: "Slug", placeholder: "category-slug", required: true, fullWidth: true },
  { name: "description", 
    label: "Description", 
    type: "textarea",
    placeholder: "Enter category description", fullWidth: true },
  {
    name: "parent_id",
    label: "Parent category",
    type: "select",
    placeholder: "No parent category",
    optionsEndpoint: "/api/categories",
    getValue: (category) => category.parent_id || category.parent?.id || "",
    fullWidth: true,
  },
];

const initialValues = {
  name: "",
  slug: "",
  parent_id: "",
};

const CreateCategory = () => (
  <EntityFormPage
    mode="create"
    entityName="Category"
    endpoint="/api/categories/create"
    listPath="/categories"
    fields={fields}
    initialValues={initialValues}
    icon={FiTag}
    summaryTitle="Category preview"
    summaryDescription="Create a category and organize it under an existing parent if needed."
    previewFields={[
      { name: "name", label: "Name", emptyText: "Category name" },
      { name: "description", label: "Description", emptyText: "Category description" },
      { name: "slug", label: "Slug", emptyText: "category-slug" },
      { name: "parent_id", label: "Parent", emptyText: "Top level category" },
    ]}
    helpText="Choose a clear category name so products stay easy to browse and filter."
  />
);

export default CreateCategory;
