import { FiPackage } from "react-icons/fi";
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
  { name: "sku", label: "SKU", placeholder: "product sku", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ]
  },
  { name: "purchase_price", label: "Purchase price", placeholder: "product purchase price" },
  { name: "selling_price", label: "Selling price", placeholder: "product selling price" },
  { name: "minimum_stock_quantity", label: "Minimum stock quantity", type: "number", placeholder: "product minimum stock quantity" },
  { name: "reorder_level", label: "Reorder level", type: "number", placeholder: "product reorder level" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Enter product description", fullWidth: true },

];

const initialValues = {
  name: "",
  slug: "",
  category_id: "",
  description: "",
};

const CreateProduct = () => (
  <EntityFormPage
    mode="create"
    entityName="Product"
    endpoint="/api/products/create"
    listPath="/products"
    fields={fields}
    initialValues={initialValues}
    icon={FiPackage}
    summaryTitle="Product preview"
    summaryDescription="Create products and connect them to the right category."
    previewFields={[
      { name: "name", label: "Product", emptyText: "Product name" },
      { name: "slug", label: "Slug", emptyText: "product-slug" },
      { name: "description", label: "Description", emptyText: "Product description" },
    ]}
    helpText="A clear product name and category make inventory records easier to scan."
  />
);

export default CreateProduct;
