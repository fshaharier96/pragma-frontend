import { FiEdit3 } from "react-icons/fi";
import EntityFormPage from "../../components/EntityFormPage";

const fields = [
  { name: "name", label: "Product name", placeholder: "Enter product name", required: true, fullWidth: true },
  { name: "slug", label: "Slug", placeholder: "product-slug", required: true },
  {
    name: "category_id",
    fallbackName: "category",
    label: "Category",
    type: "select",
    placeholder: "Select category",
    optionsEndpoint: "/api/categories",
    required: true,
  },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter product description", fullWidth: true },
];

const initialValues = {
  name: "",
  slug: "",
  category_id: "",
  description: "",
};

const UpdateProduct = () => (
  <EntityFormPage
    mode="update"
    entityName="Product"
    endpoint="/api/products/update"
    listPath="/products"
    fields={fields}
    initialValues={initialValues}
    icon={FiEdit3}
    summaryTitle="Product preview"
    summaryDescription="Update product identity, category and description."
    previewFields={[
      { name: "name", label: "Product", emptyText: "Product name" },
      { name: "slug", label: "Slug", emptyText: "product-slug" },
      { name: "description", label: "Description", emptyText: "Product description" },
    ]}
    helpText="Product changes can affect purchase, sale and stock views."
  />
);

export default UpdateProduct;
