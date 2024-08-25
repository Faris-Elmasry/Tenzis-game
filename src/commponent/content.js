import React from "react";
import { nanoid } from "nanoid";

// import Confetti from "react-confetti";

export default function Content() {
  // puplic if it win
  let [Tenzies, setTensizes] = React.useState(false);
  let changeBTNicon = Tenzies ? "New Game" : "Roll";
  //deis
  let [deis, setDies] = React.useState(allnewdies());

  //  standred obj to generate  our new die obj or use to update it instead of repat obj
  function generatenewdie() {
    return { value: Math.ceil(Math.random() * 6), isheld: false, id: nanoid() };
  }

  // get values
  function allnewdies() {
    let newdice = [];
    for (let i = 0; i < 10; i++) {
      newdice.push(generatenewdie());
    }
    // setDies(newdice)
    return newdice;
  }
  //

  //deis state and make the dies element

  let elements = deis.map((e) => {
    return (
      <h2
        className="die-ele"
        value={e.isheld}
        key={e.id}
        style={{ backgroundColor: e.isheld ? "#59e391" : "white" }}
        onClick={() => handleheldclick(e.id, e.isheld)}
      >
        {" "}
        {e.value}{" "}
      </h2>
    );
  });
  //

  // roll function
  function handlerollClick() {
    // setDies(allnewdies())

    // not change helded die and generate the other
    setDies((oldvalues) =>
      oldvalues.map((e) => {
        return e.isheld ? e : generatenewdie();
      })
    );
    if (Tenzies === true) {
      setTensizes(false);
      setDies(allnewdies());
    }
  }
  // held function
  function handleheldclick(id, isheld) {
    //change  to  held
    setDies((oldvalues) =>
      oldvalues.map((e) => {
        return e.id === id ? { ...e, isheld: !e.isheld } : e;
      })
    );
  }

  //won fun
  React.useEffect(
    function () {
      let firstvalue = deis[0].value;
      let allisvalue = deis.every((e) => e.value === firstvalue);
      let allisheld = deis.every((e) => e.isheld);

      if (allisheld && allisvalue) {
        setTensizes(true);
      }
    },
    [deis]
  );
 

  // commponent
  return (
    <>
      <div className="game-cont">
        <div className="game-head">
          <h1> Tenzies</h1>

          {/*  <Confetti numberOfPieces={250} width={width} height={height} />  */}
          {Tenzies ? (
            <div className="confettie-wrap">
              <h3> Congrulations You Are Won </h3>
            </div>
          ) : (
            <p>
              {" "}
              Roll until all dice are the same .Click each die to freeze it at
              its current value between rolls.{" "}
            </p>
          )}
        </div>
        <div className="dices">{elements}</div>
        <button onClick={handlerollClick} className="roll-btn">
          {changeBTNicon}
        </button>
      </div>
    </>
  );
}
