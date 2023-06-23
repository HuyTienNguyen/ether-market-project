import { ReactElement } from 'react';
import style from './style.module.scss';
import Header from '../header';

interface IProps {
    children: ReactElement;
}

const MainLayoutContainer = ({ children }: IProps) => {
    return (
        <main className={style.mainLayout}>
            <Header />
            <div className={style.body}> {children}</div>
        </main>
    )
}

export default MainLayoutContainer;