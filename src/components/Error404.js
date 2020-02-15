import React, {Suspense} from 'react';
import Errorimg from '../Error-404-page.png';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Error404() {
    const { t, i18n } = useTranslation();
    return (
        <div className="text-center">
            <h3>{t('page not found.1')}</h3>
            <img src={Errorimg} className="img-fluid" />
            <div className="mt-3">
            <Link className="btn btn-secondary" to='/'>
                {t('Home page.1')}
            </Link>
            </div>
        </div>
    )
}

export default Error404;
