import { theme } from '../../variables';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { post, uploadRecipe, uploadImage } from '../../utils/firebase';
import { GrFormAdd, GrFormTrash } from 'react-icons/gr';

export default function RecipeForm({ submit }) {
  const history = useHistory();
  const user = useSelector((state) => state.user_info);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [tags, setTags] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const imageHolder = useRef(null);

  function checkImageExists() {
    return imageHolder.current.files.length > 0;
  }

  function checkIngredientFormatIsCorrect() {
    const errors = ingredients.reduce((error, ingredient, i) => {
      const ingredientSplit = ingredient.split(' ');
      if (ingredientSplit.length < 1 || ingredientSplit.length > 3) {
        error.push(`ingredient ${i} wrong format. ${ingredientSplit}`);
      } else if (ingredientSplit.length === 3) {
        if (!Number(ingredientSplit[1])) {
          error.push(`ingredient ${i} has error amount: ${ingredientSplit[1]}`);
        }
      }
      return error;
    }, []);
    return errors;
  }

  function checkFormValidity() {
    let imageExists = checkImageExists();
    let ingredientFormatIsCorrect =
      checkIngredientFormatIsCorrect().length === 0;
    console.log(
      '🚀 ~ file: ShareRecipeForm.js ~ line 43 ~ checkFormValidity ~ ingredientFormatIsCorrect',
      ingredientFormatIsCorrect
    );

    let isValid = [imageExists, ingredientFormatIsCorrect].every(
      (check) => check
    );
    return isValid;
  }

  async function createRecipe() {
    const imageFile = imageHolder.current.files[0];
    const imageURL = await uploadImage(imageFile);
    console.log(title);
    console.log(ingredients);
    const ingredientsData = ingredients.map((ingredient) => {
      const [ingredient_name, ingredient_amount, ingredient_unit] =
        ingredient.split(' ');
      return {
        ingredient_name,
        ingredient_amount: ingredient_amount || '',
        ingredient_unit: ingredient_unit || '',
        ingredient_cat: '【材 料】',
      };
    });
    console.log(steps);
    console.log(tags);
    return {
      ingredients: ingredientsData,
      keyword: ingredientsData.map((ingr) => ingr.ingredient_name),
      main_image: imageURL,
      steps,
      tags: tags.split(' '),
      title,
    };
  }

  async function submitHandler(e) {
    e.preventDefault();
    console.log('sending');
    if (checkFormValidity()) {
      setIsLoading(true);
      const recipe = await createRecipe();
      const refId = await uploadRecipe(recipe);
      recipe.id = refId;
      if (submit) submit(recipe);
      console.log(`recipe written at ${refId}`);
      setIsLoading(false);
      history.goBack();
    }
  }

  function onTitleTextChange(e) {
    setTitle(e.target.value);
  }

  function onIngredientsTextChange(e, i) {
    setIngredients([
      ...ingredients.slice(0, i),
      e.target.value,
      ...ingredients.slice(i + 1),
    ]);
  }

  function addIngredientInput() {
    setIngredients([...ingredients, '']);
  }

  function removeIngredientInput(i) {
    setIngredients([...ingredients.slice(0, i), ...ingredients.slice(i + 1)]);
  }

  function onStepsTextChange(e, i) {
    setSteps([...steps.slice(0, i), e.target.value, ...steps.slice(i + 1)]);
  }

  function addStepsInput() {
    setSteps([...steps, '']);
  }

  function removeStepsInput(i) {
    setSteps([...steps.slice(0, i), ...steps.slice(i + 1)]);
  }

  function onTagsTextChange(e) {
    setTags(e.target.value);
  }

  function acceptImage(imageFile) {
    if (imageFile.length === 0) setImageSrc('');
    else {
      const imgURL = URL.createObjectURL(imageFile[0]);
      setImageSrc(imgURL);
    }
  }

  if (user && user.identity === 'none') return <Redirect to='/login' />;
  return (
    <QueryForm>
      <Title>分享食譜</Title>
      <Form action='' onSubmit={submitHandler}>
        <Field>
          <LabelMainImage htmlFor='main-image' src={imageSrc}>
            <Textbox>{imageSrc ? '更換照片' : '上傳一張照片'}</Textbox>
          </LabelMainImage>
          <InputMainImage
            id='main-image'
            type='file'
            accept='image/*'
            ref={imageHolder}
            onChange={(e) => acceptImage(e.target.files)}
          />
        </Field>
        <Field>
          <LabelTitle htmlFor='title'>食譜名稱</LabelTitle>
          <InputTitle
            id='title'
            onChange={(e) => onTitleTextChange(e)}
            required
          />
        </Field>

        <Field>
          <LabelIngredients htmlFor='ingredients'>食材</LabelIngredients>
          <InputIngredients id='ingredients'>
            {ingredients.map((ingredient, i) => {
              return (
                <Field key={i}>
                  <IngredientInput
                    value={ingredient}
                    onChange={(e) => onIngredientsTextChange(e, i)}
                    required
                  />
                  <RemoveButton onClick={() => removeIngredientInput(i)} />
                </Field>
              );
            })}
            <AddButton
              onClick={() => {
                addIngredientInput();
              }}
            />
          </InputIngredients>
        </Field>
        <Field>
          <LabelSteps htmlFor='steps'>步驟</LabelSteps>
          <InputSteps id='steps'>
            {steps.map((step, i) => {
              return (
                <React.Fragment key={i}>
                  <StepNumber>
                    {i + 1}
                    <RemoveButton onClick={() => removeStepsInput(i)} />
                  </StepNumber>
                  <Field>
                    <StepInput
                      value={step}
                      onChange={(e) => onStepsTextChange(e, i)}
                      required
                    />
                  </Field>
                </React.Fragment>
              );
            })}
            <AddButton
              onClick={() => {
                addStepsInput();
              }}
            />
          </InputSteps>
        </Field>
        <Field>
          <LabelTags htmlFor='tags'>標籤</LabelTags>
          <InputTags id='tags' onChange={(e) => onTagsTextChange(e)} required />
        </Field>
        <Submit type='submit' value='確認送出' disabled={isLoading} />
      </Form>
    </QueryForm>
  );
}

const QueryForm = styled.div`
  padding: 20px 30px;
  max-width: 800px;
  margin: 20px auto;
  position: relative;
  /* background-color: #ededed; */
`;

const Title = styled.h1`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Submit = styled.input`
  margin-top: 10px;
  padding: 3px 0;
  cursor: pointer;
`;

const Field = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  min-width: 64px;
  align-self: flex-start;
  margin-top: 7px;
`;

const Input = styled.input`
  flex-grow: 1;
  border: 1.3px solid #d3d3d3;
  padding: 7px;
`;

const LabelTitle = styled(Label)``;
const InputTitle = styled(Input)``;
const LabelMainImage = styled(Label)`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #a3a3a3;
  cursor: pointer;
  background-image: url(${(props) => (props.src ? props.src : '')});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const InputMainImage = styled.input`
  display: none;
`;
const Textbox = styled.div`
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.6);
`;
const LabelIngredients = styled(Label)``;
const InputIngredients = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
`;
const IngredientInput = styled(Input)`
  position: relative;
`;
const AddButton = styled(GrFormAdd)`
  width: 100px;
  border: 1.3px solid #d0d0d0;
  height: 20px;
  margin-top: 5px;
  cursor: pointer;
  /* background-color: ${theme.lighterOrange}; */
`;
const RemoveButton = styled(GrFormTrash)`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 20px;
`;
const LabelSteps = styled(Label)``;
const InputSteps = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
`;
const StepNumber = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  position: relative;
`;
const StepInput = styled.textarea`
  flex-grow: 1;
  resize: vertical;
  width: 160px;
  border: 1.3px solid #d3d3d3;
`;
const LabelTags = styled(Label)``;
const InputTags = styled(Input)``;
