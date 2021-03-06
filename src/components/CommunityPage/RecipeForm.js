import 'react-perfect-scrollbar/dist/css/styles.css';

import { GrFormAdd, GrFormTrash } from 'react-icons/gr';
import { TiArrowBack } from 'react-icons/ti';

import { theme, mainContentConfig } from '../../variables';

import RecipeIngredientInput from './RecipeIngredientInput';

import React, { useRef, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { v1 as uid } from 'uuid';

import { uploadRecipe, uploadImage } from '../../utils/firebase';

const emptyIngredient = {
  ingredient_name: '',
  ingredient_amount: '',
  ingredient_unit: '',
  ingredient_uid: uid(),
};

const testIngredients = [
  {
    ingredient_name: '雞蛋',
    ingredient_amount: '4',
    ingredient_unit: '顆',
    ingredient_uid: uid(),
  },
  {
    ingredient_name: '蔥',
    ingredient_amount: '3',
    ingredient_unit: '根',
    ingredient_uid: uid(),
  },
];

export default function RecipeForm({ formTitle, submit, defaultIngredients }) {
  const history = useHistory();
  const user = useSelector((state) => state.user_info);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('雙色蔥香玉子燒');
  const [ingredients, setIngredients] = useState(
    defaultIngredients || testIngredients || [emptyIngredient]
  );
  const [steps, setSteps] = useState([
    '蔥切成蔥花，將蛋黃、蛋白分開裝在不同容器，並各自打散，加點鹽調味。',
    '把蔥花倒到蛋白液中攪勻。',
    '在鍋子表面塗一層薄薄的油，熱鍋後轉中小火，倒入約2大匙蔥蛋白，轉動鍋子往四個方向讓蛋白填滿鍋面。',
    '蛋白凝固後，用筷子將蛋白往自己的方向捲起，捲好後再推往鍋子另一側。',
    '重複倒蛋液的動作，轉動鍋子時，用筷子將已捲好的蛋捲稍微提起，讓蛋液流入與蛋捲重疊。',
    '最後倒入蛋黃液，捲起來讓他定型就完成囉!',
  ]);
  const [tags, setTags] = useState('雙色蔥香玉子燒');
  const [imageSrc, setImageSrc] = useState('');
  const IMAGE_REF = useRef(null);

  function checkImageExists() {
    return IMAGE_REF.current.files.length > 0;
  }

  function checkFormValidity() {
    let imageExists = checkImageExists();
    let isValid = [imageExists].every((check) => check);
    return isValid;
  }

  async function createRecipe() {
    const imageFile = IMAGE_REF.current.files[0];
    const imageURL = await uploadImage(imageFile);

    return {
      ingredients,
      keyword: ingredients.map((ingr) => ingr.ingredient_name),
      main_image: imageURL,
      steps,
      tags: tags.split(' '),
      title,
    };
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (checkFormValidity()) {
      setIsLoading(true);
      const recipe = await createRecipe();
      const refId = await uploadRecipe(recipe);
      recipe.id = refId;

      if (submit) submit(recipe);

      setIsLoading(false);
      history.goBack();
    }
  }

  function onTitleTextChange(e) {
    setTitle(e.target.value);
  }

  function setIngredient(ingredient, i) {
    setIngredients([
      ...ingredients.slice(0, i),
      ingredient,
      ...ingredients.slice(i + 1),
    ]);
  }

  function addIngredientInput() {
    let newIngredient = { ...emptyIngredient, ingredient_uid: uid() };
    setIngredients([...ingredients, newIngredient]);
  }

  function removeIngredientInput(i) {
    const newIngredients = [
      ...ingredients.slice(0, i),
      ...ingredients.slice(i + 1),
    ];
    if (newIngredients.length === 0) return setIngredients([emptyIngredient]);
    setIngredients(newIngredients);
  }

  function onStepsTextChange(e, i) {
    setSteps([...steps.slice(0, i), e.target.value, ...steps.slice(i + 1)]);
  }

  function addStepsInput() {
    setSteps([...steps, '']);
  }

  function removeStepsInput(i) {
    const newSteps = [...steps.slice(0, i), ...steps.slice(i + 1)];
    if (newSteps.length === 0) return setSteps(['']);
    setSteps(newSteps);
  }

  function onTagsTextChange(e) {
    setTags(e.target.value);
  }

  function acceptImage(imageFile) {
    const imgURL = URL.createObjectURL(imageFile);
    setImageSrc(imgURL);
  }

  function onImageChange(e) {
    const imageFiles = e.target.files;
    if (imageFiles.length === 0) setImageSrc('');
    else acceptImage(imageFiles[0]);
  }

  if (user && user.identity === 'none') return <Redirect to="/login" />;
  return (
    <QueryForm>
      <Title>{formTitle}</Title>
      <Form action="" onSubmit={submitHandler}>
        <ImageHolder>
          <GoBackButton onClick={history.goBack} />
          <LabelMainImage htmlFor="main-image" src={imageSrc}>
            <Textbox>{imageSrc ? '更換照片' : '上傳一張照片'}</Textbox>
          </LabelMainImage>
        </ImageHolder>

        <InputMainImage
          id="main-image"
          type="file"
          accept="image/*"
          ref={IMAGE_REF}
          onChange={onImageChange}
        />

        <RecipeInfoContainer>
          <Info>
            <FieldSection>
              <LabelTitle htmlFor="title">食譜名稱</LabelTitle>
              <InputTitle
                id="title"
                onChange={onTitleTextChange}
                required
                value={title}
              />
            </FieldSection>
            <FieldSection>
              <LabelIngredients htmlFor="ingredients">食材</LabelIngredients>
              <InputIngredients id="ingredients">
                {ingredients.map((ingredient, i) => (
                  <IngredientField key={ingredient.ingredient_uid}>
                    <RecipeIngredientInput
                      ingredient={ingredient}
                      setLeftover={(ingredient) => setIngredient(ingredient, i)}
                    />
                    <RemoveIngredientButton
                      onClick={() => removeIngredientInput(i)}
                    />
                  </IngredientField>
                ))}
                <AddButton onClick={addIngredientInput} />
              </InputIngredients>
            </FieldSection>
            <FieldSection>
              <LabelSteps htmlFor="steps">步驟</LabelSteps>
              <InputSteps id="steps">
                {steps.map((step, i) => {
                  return (
                    <StepField key={i}>
                      <StepNumber>
                        {i + 1}
                        <RemoveButton onClick={() => removeStepsInput(i)} />
                      </StepNumber>
                      <StepInput
                        rows={4}
                        value={step}
                        onChange={(e) => onStepsTextChange(e, i)}
                        required
                      />
                    </StepField>
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
                onChange={onTagsTextChange}
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
  max-width: 800px;
  margin: 20px auto;
  position: relative;
  /* background-color: #ededed; */
  @media screen and (min-width: 400px) {
    padding: 20px 30px;
  }
`;

const RecipeInfoContainer = styled(PerfectScrollbar)`
  width: 90%;
  margin: 0 auto;
  padding: 0 0 20px;

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
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);

  gap: 30px;
  width: 100%;
  margin: 20px auto;

  @media screen and (min-width: 400px) {
    border-radius: 7px;
  }

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
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  min-width: 64px;
  flex-shrink: 1;
  align-self: flex-start;
  margin: 10px 0 0px;
  color: ${theme.darkbrown};
`;

const Input = styled.input`
  flex-grow: 1;
  border: 1.3px solid #d3d3d3;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 7px 15px;
  color: ${theme.darkbrown};
  transition: all 0.2s ease;
  border-radius: 20px;

  &:hover,
  &:focus {
    background-color: white;
  }
`;

const TextLabel = styled(Label)`
  font-size: 1.3em;
  width: 100%;
  padding-bottom: 3px;
  border-bottom: 1.5px solid ${theme.darkbrown};
`;

const LabelTitle = styled(TextLabel)``;
const InputTitle = styled(Input)``;
const LabelMainImage = styled(Label)`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 200px;
  border-radius: 7px 7px 0 0;
  align-self: stretch;
  position: relative;

  @media screen and (min-width: 400px) {
    height: 300px;
  }
  @media screen and (min-width: 600px) {
    height: 350px;
  }
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
  transition: 0.3s all ease;
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
`;

const IngredientField = styled(Field)`
  align-items: center;
`;
const LabelIngredients = styled(TextLabel)``;
const InputIngredients = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
`;

const AddButton = styled(GrFormAdd)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-top: -5px;
  border-radius: 20px;
  border: 1px solid gray;
  transition: 0.1s ease all;

  & path {
    stroke: darkgray;
  }
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

  & path {
    stroke: #999;
  }

  &:hover {
    transform: translateY(-50%) scale(1.09);
    & path {
      stroke: red;
    }
  }
`;

const RemoveIngredientButton = styled(GrFormTrash)`
  cursor: pointer;
  min-width: 25px;
  margin-right: 5px;
  font-size: 25px;

  & path {
    stroke: #999;
  }

  &:hover {
    transform: scale(1.09);
    & path {
      stroke: red;
    }
  }
`;

const LabelSteps = styled(TextLabel)`
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
    bottom: 2px;
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
  padding: 10px;
  color: ${theme.darkbrown};
  background-color: rgba(255, 255, 255, 0.3);
  transition: background-color ease 0.2s;

  &:hover,
  &:focus {
    background-color: white;
  }
`;
const LabelTags = styled(TextLabel)``;
const InputTags = styled(Input)``;
