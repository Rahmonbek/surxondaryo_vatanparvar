import React from 'react';
import {ActivityListItem} from "./ActivityListItem";

import "./assets/activity.scss"
import {PageTitle} from "../ui/PageTitle";
import { useTranslation } from 'react-i18next';
// import  {i18n}  from 'i18next';
import i18n from '../ui/i18next';



export function Activity() {

    const {t,} = useTranslation();
    const items = [
        {
          content:i18n.t('activity-title1'),
          link: "/yoshlar-va-fuqarolarni-manaviy-axloqiy",
          imgUrl: "https://vatanparvar.uz/img/1.jpg"
        },
        {
            content: i18n.t('activity-title2'),
            link: "/sportning-texnik-va-amaliy-turlarini",
            imgUrl: "https://vatanparvar.uz/img/2.jpg"
        },
        {
            content:i18n.t('activity-title3'),
            link: "/bolalar-osmirlar-va-chaqiruvgacha",
            imgUrl: "https://vatanparvar.uz/img/3.jpg"
        },
       
        {
            content:i18n.t('activity-title4'),
            link: "/yoshlar-va-fuqarolarni-mudofaa",
            imgUrl: "https://vatanparvar.uz/img/4.jpg"
        },
       
        {
            content:i18n.t('activity-title5'),
            link: "/avtomototransport-vositalari-haydovchilarini",
            imgUrl: "https://vatanparvar.uz/img/5.jpg"
        },
        {
            content: i18n.t('activity-title6'),
            link: "/xalqaro-tashkilotlar-bilan-faol-hamkorlik-qilish",
            imgUrl: "https://vatanparvar.uz/img/6.jpg"
        }
    ]
    return (
        <div className="activity">
            <div className="container">
                <PageTitle title={t('faoliyat')} />
                <div className="activity_list">
                    {
                        //@ts-ignore
                        items.map((item,index) => {
                            return (
                                <ActivityListItem key={index} data={item}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

