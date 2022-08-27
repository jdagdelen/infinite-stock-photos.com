import React from 'react';

const SocialShare = () => {
  const style = () => `.share-button {
        position: relative;
        width: 40px;
        margin: 20px;
      }
      
      .toggle {
        position: relative;
        width: 40px;
        height: 40px;
        z-index: 10;
        display: block;
        border-radius: 25px;
        cursor: pointer;
        background-color: #f4f3ed;
        color: #e67e22;
        transition: all 0.5s ease;
      }
      .toggle:hover {
        box-shadow: inset 0 0 0 39px #e67e22;
        color: #f4f3ed;
      }
      .toggle:after {
        position: relative;
        display: block;
        width: 40px;
        height: 40px;
        font-family: "FontAwesome";
        content: "";
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        left: -2px;
      }
      .toggle-input {
        display: none;
      }
      .toggle-input:checked + .toggle {
        box-shadow: inset 0 0 0 39px #e67e22;
        color: #fff;
      }
      .toggle-input:checked + .toggle:after, .toggle-input:checked + .toggle:before {
        background-color: #f4f3ed;
        content: "";
        height: 3px;
        width: 20px;
        position: absolute;
        left: 10px;
        top: 19px;
      }
      .toggle-input:checked + .toggle:after {
        transform: rotate(45deg);
        -webkit-animation: bar1 0.5s forwards;
                animation: bar1 0.5s forwards;
      }
      .toggle-input:checked + .toggle:before {
        transform: rotate(-45deg);
        -webkit-animation: bar2 0.5s forwards;
                animation: bar2 0.5s forwards;
      }
      
      .network-list {
        position: absolute;
        z-index: 9;
        top: 0;
        left: 25px;
        width: 120px;
        margin: 0;
        padding: 0;
        border-radius: 26px;
        overflow: hidden;
        opacity: 0;
        -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
        transition: all 0.4s cubic-bezier(0.43, 0.26, 0.37, 1.73);
        transform-origin: 0% 50%;
        transform: perspective(600px) rotateX(0) rotateY(90deg) rotateZ(0);
      }
      .network-list li {
        display: block;
        width: 40px;
        height: 40px;
        margin: 0;
        padding: 0;
        float: left;
        list-style-type: none;
      }
      .network-list a {
        position: relative;
        display: block;
        width: 40px;
        height: 40px;
        overflow: hidden;
        line-height: 40px;
        text-indent: 120%;
        text-decoration: none;
      }
      .network-list:hover a:before {
        background-color: #bdc3c7;
      }
      .network-list a:before {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        width: 40px;
        height: 40px;
        font-family: "FontAwesome";
        font-size: 18px;
        -webkit-font-smoothing: antialiased;
        text-align: center;
        line-height: 40px;
        text-indent: 0;
        color: #fff;
        background-color: #95a5a6;
        transition: all 0.25s ease-in-out;
      }
      .network-list .twitter a:before {
        content: "";
      }
      .network-list .twitter a:hover:before {
        background-color: #00c3f3;
      }
      .network-list .facebook a:before {
        content: "";
      }
      .network-list .facebook a:hover:before {
        background-color: #2c609b;
      }
      .network-list .googleplus a:before {
        content: "";
      }
      .network-list .googleplus a:hover:before {
        background-color: #DF5A7B;
      }
      
      input:checked ~ .network-list {
        left: 60px;
        opacity: 1;
        transform: perspective(600px) rotateX(0) rotateY(0) rotateZ(0);
      }
      
      @-webkit-keyframes bar1 {
        0% {
          content: "";
          width: 46px;
          height: 40px;
          background-color: transparent;
          transform: rotate(0deg) scale(1);
          top: 0;
          left: 0;
          opacity: 1;
        }
        50% {
          background-color: transparent;
          content: "";
          width: 46px;
          height: 40px;
          top: 0;
          left: 0;
          transform: rotate(0deg) scale(0.2);
          opacity: 0;
        }
        50.001% {
          background-color: #fff;
          left: 10px;
          top: 22px;
          content: "";
          height: 3px;
          width: 30px;
        }
        60% {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }
        100% {
          transform: rotate(45deg) scale(1);
        }
      }
      
      @keyframes bar1 {
        0% {
          content: "";
          width: 46px;
          height: 40px;
          background-color: transparent;
          transform: rotate(0deg) scale(1);
          top: 0;
          left: 0;
          opacity: 1;
        }
        50% {
          background-color: transparent;
          content: "";
          width: 46px;
          height: 40px;
          top: 0;
          left: 0;
          transform: rotate(0deg) scale(0.2);
          opacity: 0;
        }
        50.001% {
          background-color: #fff;
          left: 10px;
          top: 22px;
          content: "";
          height: 3px;
          width: 30px;
        }
        60% {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }
        100% {
          transform: rotate(45deg) scale(1);
        }
      }
      @-webkit-keyframes bar2 {
        0% {
          background-color: transparent;
          transform: rotate(0deg) scale(0.2);
          opacity: 0;
        }
        50% {
          background-color: transparent;
          transform: rotate(0deg) scale(0.2);
          opacity: 0;
        }
        60% {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }
        100% {
          transform: rotate(-45deg) scale(1);
        }
      }
      @keyframes bar2 {
        0% {
          background-color: transparent;
          transform: rotate(0deg) scale(0.2);
          opacity: 0;
        }
        50% {
          background-color: transparent;
          transform: rotate(0deg) scale(0.2);
          opacity: 0;
        }
        60% {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }
        100% {
          transform: rotate(-45deg) scale(1);
        }
      }
      h1 {
        position: absolute;
        top: 5vh;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 22px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #c4c2bb;
        text-shadow: 1px 1px 0px #ffffff;
        letter-spacing: 0.5px;
      }
      
`;

  return (
    <>
      <style>{style()}</style>
      <div className='share-button'>
        <input className='toggle-input' id='toggle-input' type='checkbox' />
        <label htmlFor='toggle-input' className='toggle'></label>
        <ul className='network-list'>
          <li className='twitter'>
            <a href='#'>Share on Twitter</a>
          </li>
          <li className='facebook'>
            <a href='#'>Share on Facebook</a>
          </li>
          <li className='googleplus'>
            <a href='#'>Share on Google+</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SocialShare;
