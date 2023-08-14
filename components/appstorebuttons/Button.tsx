import React, { FC } from 'react';

import classNames from 'classnames';
import { Outfit } from 'next/font/google';

type ButtonProps = {
  theme?: 'dark' | 'light';
  height?: number;
  width?: number;
  logo: string;
  storeName: string;
  title: string;
  url: string;
  className?: string;
  border?: number;
};

const outfit = Outfit({
  subsets: ['latin'],
});

const Button: FC<ButtonProps> = ({
  theme = 'light',
  height = 60,
  width = 200,
  border,
  logo,
  storeName,
  title,
  url,
  className,
}) => {
  return (
    <>
      <style jsx>{`
  .button-container {
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    cursor: pointer;

    border: 2px solid var(--primary-color);
    border-radius: 10px;
  }

.button-container-dark {
  background-color: #202020;
  color: #fff;
}

.button-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: ${outfit.style.fontFamily};
}

.button-store-name {
  font-size: 20px;
  font-weight: bold;
}

.button-title {
  font-size: 12px;
}
`}</style>
      <div
        onClick={() => url && window.open(url, '_blank')}
        style={{
          height: height,
          width: width,
          borderRadius: border,
        }}
        className={classNames(
          'button-container',
          `button-container-${theme}`,
          className
        )}
      >
        <img src={logo} alt={storeName} />
        <div className="button-text-container">
          <span className="button-title">{title}</span>
          <span className="button-store-name">{storeName}</span>
        </div>
      </div>
    </>
  );
};

export default Button;
