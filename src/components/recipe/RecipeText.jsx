import { FInput } from '../helpers/form/FInput';

const RecipeText = ({ recipeId, loading, defaultValue }) => {
  return (
    <FInput
      type="area" /* NOTE: Refers to Chakra editable component, not related to editable prop! */
      fieldName={`description.text`}
      rules={{ required: 'This is required' }}
      label={null}
      helper={null}
      defaultValue={defaultValue}
      placeholder="Recipe text"
      disabled={loading}
      px={2}
      m={0}
      rows={20}
    />
  );
};

export default RecipeText;
