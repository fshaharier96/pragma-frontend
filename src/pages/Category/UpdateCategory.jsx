import { FiEdit3 } from "react-icons/fi";
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
    optionFilter: (category, { id }) => String(category.id) !== String(id),
  },
];

const initialValues = {
  name: "",
  slug: "",
  parent_id: "",
};

const UpdateCategory = () => (
  <EntityFormPage
    mode="update"
    entityName="Category"
    endpoint="/api/categories/update"
    listPath="/categories"
    fields={fields}
    initialValues={initialValues}
    icon={FiEdit3}
    summaryTitle="Category preview"
    summaryDescription="Update category details and keep product organization accurate."
    previewFields={[
      { name: "name", label: "Name", emptyText: "Category name" },
      { name: "slug", label: "Slug", emptyText: "category-slug" },
      { name: "parent_id", label: "Parent", emptyText: "Top level category" },
    ]}
    helpText="Updating a parent changes where this category appears in product organization."
  />
);

export default UpdateCategory;
