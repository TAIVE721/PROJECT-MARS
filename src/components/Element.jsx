import { useId, useState } from "react";
import { useElements } from "../hooks/useElements";
import { useCategorys } from "../hooks/useCategory";

export function ElementCreate({ setisAgregate, categorys }) {
  const unId = useId();

  const { addElement } = useElements();

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = Number(event.target.elements["selects"].value);

    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;
    const weight = event.target.elements.weight.value;

    const toupdateElement = {
      name: name,
      description: description,
      weight: weight,
      category: id,
    };

    addElement(toupdateElement);
    setisAgregate(false);
  };

  return (
    <li>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={unId}>
            <select name="selects" id={unId}>
              {categorys.map((category) => {
                return (
                  <option key={category.categoryname} value={category.id}>
                    {category.categoryname}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div>
          <input
            required
            name="name"
            type="text"
            placeholder="Nombre del Elemento"
          />
          <input
            required
            name="weight"
            type="number"
            placeholder="Peso del elemento"
          />
          <input
            name="description"
            type="text"
            placeholder="Descripción del elemento"
          />
        </div>
        <footer>
          <button type="submit">Agregar</button>
        </footer>
      </form>
    </li>
  );
}

export function ElementEdit({ element, setisEdit, categorys }) {
  const unId = useId();

  const { updateElement } = useElements();

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = Number(event.target.elements["selects"].value);

    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;
    const weight = event.target.elements.weight.value;

    const toupdateElement = {
      ...element,
      name: name,
      description: description,
      weight: weight,
      category: id,
    };

    updateElement(toupdateElement);
    setisEdit(false);
  };

  return (
    <li>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={unId}>
            <select
              name="selects"
              id={unId}
              defaultValue={element.category.categoryname}
            >
              {categorys.map((category) => {
                console.log(category);
                return (
                  <option key={category.categoryName} value={category.id}>
                    {category.categoryName}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div>
          <input
            required
            name="name"
            type="text"
            placeholder="Nombre del Elemento"
            defaultValue={element.name}
          />
          <input
            required
            name="weight"
            type="number"
            placeholder="Peso del elemento"
            defaultValue={element.weight}
          />
          <input
            name="description"
            type="text"
            placeholder="Descripción del elemento"
            defaultValue={element.description}
          />
        </div>
        <footer>
          <button type="submit">Guardar</button>
        </footer>
      </form>
    </li>
  );
}

export function ElementView({ element }) {
  const { removeElement } = useElements();
  const { categorys } = useCategorys();

  const CategoryExist = categorys.find(
    (category) => category.id === element.category.id
  );

  console.log(CategoryExist);

  return (
    <li>
      <article>
        <div>
          <h2>{element.category.priority}</h2>
          <h2>{element.category.categoryname}</h2>
        </div>
        <div>
          <h3>{element.name} </h3>
          <h4>{element.weight}</h4>
          <p>{element.description}</p>
        </div>
        <footer>
          <button onClick={() => removeElement(element.id)}>Eliminar</button>
        </footer>
      </article>
      {CategoryExist === undefined ? <p>Category not found</p> : null}
    </li>
  );
}

export function ElementItem({ element, categorys }) {
  const [isEdit, setisEdit] = useState(false);

  return (
    <>
      {isEdit ? (
        <ElementEdit
          categorys={categorys}
          setisEdit={setisEdit}
          element={element}
        ></ElementEdit>
      ) : (
        <ElementView element={element}></ElementView>
      )}

      <button
        onClick={() => {
          setisEdit(!isEdit);
        }}
      >
        {isEdit ? <p>Cancelar</p> : <p>Editar</p>}
      </button>
    </>
  );
}
