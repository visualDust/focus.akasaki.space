import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { Parallax, Background } from 'react-parallax';
import {
  AkasakiFeatures,
  Feature,
  FeatureList,
} from "../components/AkasakFeatures";
import { ResponsiveBar } from "@nivo/bar";
import Typical from "react-typical";
import * as config from "./_index.config";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";
import {
  WakatimeEditors,
  WakatimeFeatures,
  WakatimeLanguages,
} from "../components/WakatimeFeatures";
import { GithubFeatures } from "../components/GithubFeatures";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Zoom,
  EffectCreative,
} from "swiper";
import { useWakatimeData } from "../hooks/useWakatimeData";

SwiperCore.use([
  Zoom,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  EffectCreative,
]);

import "./index.css";

function HomepageBackground() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("hero hero--primary themedHead", styles.heroBanner)} style={{
      // backgroundImage: `url(${bgimg})`,
      // backgroundPosition: 'bottom',
      // backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat'
    }}>
      <div className="container" >
        <div className="row">
          <div
            className={clsx(
              "col",
              "col--" + config.title_width,
              styles.centerChild
            )}
            style={{
              alignSelf: "center",
              marginBottom: "50px",
              minHeight: "30em",
            }}
          >
            <p
              className="hero__title"
              style={{
                textShadow: "4px 4px var(--ifm-color-primary-darker)",
                animationName: "focusin",
                animationDuration: "3s",
                animationIterationCount: "infinite",
                animationDirection: "alternate-reverse",
              }}
            >
              {siteConfig.title}
            </p>
            <p className="hero__subtitle">
              <Typical
                steps={config.subtitles_and_delays.flatMap((x) => [
                  x.text,
                  x.delay,
                ])}
                loop={Infinity}
                wrapper="span"
              />
            </p>
            <div>
              <a
                className="button button--outline"
                style={{ border: "solid 1px" }}
                href="/docs"
              >
                Blogs
              </a>
            </div>
          </div>
          <div
            className={clsx(
              "col",
              "col--" + (12 - config.title_width),
              styles.centerChild
            )}
          >
            {/* <img
              src={
                config.illustrations[
                  Math.floor(Math.random() * config.illustrations.length)
                ]
              }
              alt="Programmer"
            /> */}
            <BrowserOnly>{carousel}</BrowserOnly>
          </div>
        </div>
      </div>
    </header>
  );
}

function carousel() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 997 });
  return (
    <Carousel
      axis={isTabletOrMobile ? "horizontal" : "vertical"}
      autoPlay
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      swipeable={false}
    >
      {config.illustrations.map((item) => (
        <img src={item} />
      ))}
    </Carousel>
  );
}

function WhereAndWhat(){
  return (
    <div className={clsx("container","hero")} style={{
      height:"500px",
    }}>
         <div className="row" style={{width:'inherit'}}>
           <div className="col col--7">
             <img src="/img/illustrations/worldmap.svg" alt="where am i" />
             <div style={{textAlign:'center'}}>
               <Typical
               loop={Infinity}
               wrapper="span"
               steps={["Where am I",1000,"CHINA!",1000]}
               ></Typical>
             </div>
           </div>
           
         </div>
    </div>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Akasaki Focusing is where Gavin Gong (aka VisualDust) enjoys coding life"
    >
      <HomepageBackground />
      <main>
        <BrowserOnly>{FeatureSwiper}</BrowserOnly>
        {/* <Parallax bgImage={bgimg} strength={500}>
          <div style={{ height: 500 }}>
            <GithubFeatures></GithubFeatures>
          </div>
        </Parallax> */}
        <WhereAndWhat />
      </main>
    </Layout>
  );
}

function FeatureSwiper(): JSX.Element {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 997 });
  const waka = useWakatimeData();
  return (
    <Swiper
      className={clsx("hero")}
      style={{ display: "flex", alignContent: "center" }}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      // autoHeight={true}
      pagination={{
        dynamicBullets: true,
      }}
      navigation={true}
      keyboard={true}
      // mousewheel={true}
      effect={"cards"}
      zoom={true}
    >
      {isTabletOrMobile ? (
        <>
          {FeatureList.map((props, idx) => (
            <SwiperSlide style={{ padding: "20px" }}>
              <Feature key={idx} {...props} />
            </SwiperSlide>
          ))}
          <SwiperSlide style={{ padding: "20px" }}>
            <WakatimeLanguages data={waka} />
          </SwiperSlide>
          <SwiperSlide style={{ padding: "20px" }}>
            <WakatimeEditors data={waka} />
          </SwiperSlide>
          <SwiperSlide style={{ padding: "100px 20px" }}>
            <GithubFeatures />
          </SwiperSlide>
        </>
      ) : (
        <>
          <SwiperSlide>
            <AkasakiFeatures />
          </SwiperSlide>
          <SwiperSlide>
            <WakatimeFeatures data={waka} />
          </SwiperSlide>
          <SwiperSlide>
            <GithubFeatures />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  );
}
