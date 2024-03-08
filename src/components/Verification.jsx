import { useEffect, useState } from "react";
import { useElements } from "../hooks/useElements";

export function Verification() {
  const { elements } = useElements();
  const [ToVerifi, setToVerifi] = useState();
  const [WeightToComprobe, setWeightToCOmprobe] = useState(200);
  const [ActiveVerifi, setActiveVerifi] = useState();

  const handleClick = () => {
    setToVerifi(!ToVerifi);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const weight = event.target.elements[0].value;
    setWeightToCOmprobe(Number(weight));
  };

  useEffect(() => {
    const sum = elements.reduce((inicial, element) => {
      return inicial + Number(element.weight);
    }, 0);
    if (sum <= WeightToComprobe) {
      setActiveVerifi(true);
    } else {
      setActiveVerifi(false);
    }
  }, [ToVerifi]);

  return (
    <article>
      <header>
        <h2>Peso a comprobar {WeightToComprobe}</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" />
        </label>
        <button type="submit">Cambiar Peso</button>
      </form>
      <div>
        {ActiveVerifi === true ? <p>Peso aceptado</p> : <p>Exceso de peso</p>}
        <button onClick={handleClick}>Verificar</button>
      </div>
    </article>
  );
}
