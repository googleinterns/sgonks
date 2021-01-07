import React from "react"
import classes from "./Explanation.module.css"

const Explanation = (props) => {
  return (
    <div className={classes.ExplanationPage}>
      <div className={classes.Title}>
        <p>Whan to know what's going on ?</p>
        <br></br>
      </div>
      <div className={classes.ExplanationContainer}>
        <p>
          Bacon ipsum dolor amet buffalo kielbasa turkey strip steak rump.
          T-bone ribeye pork belly ham hock swine, cupim sirloin boudin. Chislic
          turducken t-bone, ground round drumstick ham strip steak kielbasa.
          Spare ribs tenderloin chislic porchetta landjaeger. Frankfurter beef
          landjaeger t-bone kevin kielbasa. Biltong pork chop buffalo bacon.
        </p>
        <p>
          Frankfurter pastrami doner flank short ribs bacon cow sausage pancetta
          kielbasa t-bone fatback boudin. Rump sirloin pork chop jowl ribeye.
          Hamburger brisket capicola chicken beef ham hock pork chop jerky
          ribeye rump tail pig. Pastrami venison pork tongue, burgdoggen
          capicola t-bone chuck salami ribeye corned beef pig drumstick jowl.
          Flank buffalo ham hock doner filet mignon sausage. Doner tongue
          pancetta flank. Shank pork beef ribs buffalo, rump jowl salami brisket
          spare ribs pork loin short ribs ham hock.
        </p>
        <p>
          Ham hock porchetta pork, meatloaf ball tip bacon buffalo. Salami
          fatback rump venison porchetta, ham hock tenderloin chuck strip steak
          turducken short ribs turkey chicken pork chop. Biltong pork loin chuck
          meatball, bresaola brisket pork belly short loin turkey alcatra kevin
          doner drumstick corned beef short ribs. Tenderloin kielbasa shoulder
          hamburger buffalo strip steak. Sausage shank hamburger t-bone pork
          belly pork jerky porchetta jowl.
        </p>
      </div>
    </div>
  )
}

export default Explanation
