import { theme, mainContentConfig } from '../../variables';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { post, uploadRecipe, uploadImage } from '../../utils/firebase';
import { GrFormAdd, GrFormTrash } from 'react-icons/gr';
import { TiArrowBack } from 'react-icons/ti';

export default function RecipeForm({ formTitle, submit, defaultIngredients }) {
  const history = useHistory();
  const user = useSelector((state) => state.user_info);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(
    defaultIngredients || [
      '洋蔥 0.5 顆',
      '馬鈴薯 1 顆',
      '紅蘿蔔 0.5 根',
      '牛腱 140 g',
    ]
  );
  const [steps, setSteps] = useState([
    // '微量的油，蒜末爆香，洋蔥&紅蘿蔔切塊炒到洋蔥微軟黃色。放入番茄罐的整理番茄&1湯匙的番茄汁液',
    // '倒入1.5杯米的水量，蓋鍋煨煮',
    // '牛排（牛腱）燙過後，切塊。平底鍋加蒜香無水奶油，牛肉下鍋煎到焦香，加入湯鍋。撒入大蒜綜合香料，少許二砂糖、薄鹽醬油、鹽麴。',
    // '湯鍋煮滾後，蓋鍋蓋，文火燉10分鐘關火燜。鍋子摸起來不燙，再重複煮滾燜。重複3-4次就軟而不爛。每打開一次可視情況加水、調味。',
    // '煮香料飯、配半熟土雞蛋👍',
  ]);
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
    console.log(errors);
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

  if (user && user.identity === 'none') return <Redirect to="/login" />;
  return (
    <QueryForm>
      <Title>{formTitle}</Title>
      <Form action="" onSubmit={submitHandler}>
        <ImageHolder>
          <GoBackButton onClick={(e) => history.goBack()} />
          <LabelMainImage htmlFor="main-image" src={imageSrc}>
            <Textbox>{imageSrc ? '更換照片' : '上傳一張照片'}</Textbox>
          </LabelMainImage>
        </ImageHolder>

        <InputMainImage
          id="main-image"
          type="file"
          accept="image/*"
          ref={imageHolder}
          onChange={(e) => acceptImage(e.target.files)}
        />

        <RecipeInfoContainer>
          <Info>
            <FieldSection>
              <LabelTitle htmlFor="title">食譜名稱</LabelTitle>
              <InputTitle
                id="title"
                onChange={(e) => onTitleTextChange(e)}
                required
                value={title}
              />
            </FieldSection>
            <FieldSection>
              <LabelIngredients htmlFor="ingredients">食材</LabelIngredients>
              <InputIngredients id="ingredients">
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
            </FieldSection>
            <FieldSection>
              <LabelSteps htmlFor="steps">步驟</LabelSteps>
              <InputSteps id="steps">
                {steps.map((step, i) => {
                  return (
                    <React.Fragment key={i}>
                      <StepField>
                        <StepNumber>{i + 1}</StepNumber>
                        <StepInput
                          rows={4}
                          value={step}
                          onChange={(e) => onStepsTextChange(e, i)}
                          required
                        />
                        <RemoveButton onClick={() => removeStepsInput(i)} />
                      </StepField>
                    </React.Fragment>
                  );
                })}
                <AddButton
                  onClick={() => {
                    addStepsInput();
                  }}
                />
              </InputSteps>
            </FieldSection>
            <FieldSection>
              <LabelTags htmlFor="tags">標籤</LabelTags>
              <InputTags
                id="tags"
                onChange={(e) => onTagsTextChange(e)}
                required
                value={tags}
              />
            </FieldSection>
            <Submit
              type="submit"
              value={isLoading ? '請稍後...' : '確認送出'}
              disabled={isLoading}
            />
          </Info>
        </RecipeInfoContainer>
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

const RecipeInfoContainer = styled(PerfectScrollbar)`
  width: 90%;
  margin: 0 auto;
  padding: 0 20px 20px;

  @media screen and (min-width: 769px) {
    padding: 20px 20px 20px 0;
    width: 55%;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);

  gap: 30px;
  border-radius: 7px;
  width: 100%;
  margin: 20px auto;

  @media screen and (min-width: 769px) {
    flex-direction: row;
    height: calc(${mainContentConfig.computer_height} - 150px);
  }
`;

const Submit = styled.input`
  margin-top: 10px;
  padding: 3px 0;
  cursor: pointer;
  border-radius: 20px;
  /* border: 1px solid ${theme.darkbrown}; */
  border: none;
  color: ${theme.darkbrown};

  &:hover {
    background-color: ${theme.darkbrown};
    color: white;
  }
`;

const Field = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  gap: 0 10px;
`;
const FieldSection = styled(Field)`
  /* border-left: 1px solid ${theme.darkbrown}; */
`;

const Label = styled.label`
  min-width: 64px;
  flex-shrink: 1;
  align-self: flex-start;
  margin: 10px 0 0px;
  /* border: 1px solid ${theme.darkbrown}; */
  color: ${theme.darkbrown};
`;

const Input = styled.input`
  flex-grow: 1;
  border: 1.3px solid #d3d3d3;
  background-color: #efefef;
  padding: 7px 15px;
  color: ${theme.darkbrown};
  transition: all 0.2s ease;
  border-radius: 20px;

  &:hover,
  &:focus {
    background-color: white;
  }
`;

const LabelTitle = styled(Label)``;
const InputTitle = styled(Input)``;
const LabelMainImage = styled(Label)`
  /* width: 100%;
  height: 350px;
  border-radius: 7px 7px 0 0;
  align-self: stretch;
  position: relative;
  @media screen and (min-width: 769px) {
    width: 45%;
    border-radius: 7px 0 0 7px;
    height: unset;
  } */
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px dashed #a3a3a3; */
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
  background-image: url(${(props) => (props.src ? props.src : '')});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: 0.3s ease all;
  margin: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);

    &:hover > div {
      background-color: ${theme.darkbrown};
      color: white;
    }
  }
`;

const ImageHolder = styled.div`
  width: 100%;
  height: 350px;
  border-radius: 7px 7px 0 0;
  align-self: stretch;
  position: relative;
  @media screen and (min-width: 769px) {
    width: 45%;
    border-radius: 7px 0 0 7px;
    height: unset;
  }
`;

const GoBackButton = styled(TiArrowBack)`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  padding: 5px 15px 15px 5px;
  cursor: pointer;
  fill: ${theme.darkbrown};
  background-color: rgba(255, 255, 255, 0.8);
  /* border-radius: 0 0 50px; */
  transition: 0.3s all ease;
  /* clip-path: polygon(0 0, 100% 0, 0 100%); */
  clip-path: circle(50px at left top);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 1px 4px 4px black;
  }
`;

const InputMainImage = styled.input`
  display: none;
`;
const Textbox = styled.div`
  padding: 7px 20px;
  color: ${theme.darkbrown};
  border: 1px solid ${theme.darkbrown};
  border-radius: 30px;
  transition: 0.3s ease all;
  /* background-color: rgba(255, 255, 255, 0.6); */
`;
const LabelIngredients = styled(Label)``;
const InputIngredients = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
`;
const IngredientInput = styled(Input)`
  position: relative;
`;
const AddButton = styled(GrFormAdd)`
  width: 100%;
  height: 30px;
  cursor: pointer;
  margin-top: -5px;
  border-radius: 20px;
  border: 1px solid ${theme.darkbrown};
  transition: 0.1s ease all;

  &:hover {
    background-color: ${theme.darkbrown};
    & path {
      stroke: white;
    }
  }
`;
const RemoveButton = styled(GrFormTrash)`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px;

  &:hover {
    transform: translateY(-50%) scale(1.09);
    & path {
      stroke: red;
    }
  }
`;
const LabelSteps = styled(Label)`
  align-self: flex-start;
  margin-top: 5px;
`;
const InputSteps = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex-grow: 1;
`;
const StepField = styled(Field)`
  flex-direction: column;

  & ${RemoveButton} {
    top: unset;
    transform: none;
    bottom: 5px;
    &:hover {
      transform: scale(1.09);
    }
  }
`;
const StepNumber = styled.h2`
  font-size: 1.3em;
  font-weight: bold;
  position: relative;
  color: ${theme.darkbrown};
`;

const StepInput = styled.textarea`
  margin-top: 5px;
  flex-grow: 1;
  resize: vertical;
  width: 100%;
  min-height: max-content;
  border-radius: 8px;
  border: none;
  padding: 5px 10px;
  color: ${theme.darkbrown};
  background-color: #efefef;
  transition: background-color ease 0.2s;

  &:hover,
  &:focus {
    background-color: white;
  }
`;
const LabelTags = styled(Label)``;
const InputTags = styled(Input)``;
