"use client";

import { KakaoMapResultType, SearchResult } from "@/types/kakaoMap.type";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  kakaoMapResult: KakaoMapResultType;
  setKakaoMapResult: Dispatch<SetStateAction<KakaoMapResultType>>;
}

function CreateKakaoMap({ kakaoMapResult, setKakaoMapResult }: KakaoMapProps) {
  const { placeName } = kakaoMapResult;

  const coordinates = {
    lat: kakaoMapResult.latitude,
    lng: kakaoMapResult.longitude,
  };

  useEffect(() => {
    function loadKakaoMap() {
      if (!window.kakao || !window.kakao.maps) return;

      window.kakao.maps.load(() => {
        if (!placeName) return;

        const places = new window.kakao.maps.services.Places();

        places.keywordSearch(placeName, (data: SearchResult[], status: any) => {
          if (status === window.kakao.maps.services.Status.OK && data[0]) {
            const firstResult = data[0];
            const WholeAddress =
              firstResult.road_address_name || firstResult.address_name; // 전체 주소
            const administrativeDistrict = WholeAddress.slice(0, 2); // 행정구역

            const result: KakaoMapResultType = {
              placeName: placeName,
              region: administrativeDistrict,
              address: WholeAddress,
              latitude: parseFloat(firstResult.y),
              longitude: parseFloat(firstResult.x),
            };

            setKakaoMapResult(() => result);
          }
        });
      });
    }

    loadKakaoMap();
  }, [placeName, setKakaoMapResult]);

  return (
    <Map
      center={coordinates}
      level={3}
      className="w-full col-span-5 h-[210px] sm:h-[360px] rounded-md"
    >
      <MapMarker position={coordinates}></MapMarker>
      <div className="customoverlay relative">
        <CustomOverlayMap position={coordinates} yAnchor={1}>
          {placeName && (
            <span
              className=" bg-primary-100 rounded-lg text-white p-2 text-sm absolute bottom-11 left-0 border-none"
              onClick={() => {
                const url = `https://map.kakao.com/link/map/${placeName},${coordinates.lat},${coordinates.lng}`;
                window.open(url, "_blank");
              }}
            >
              {placeName}
            </span>
          )}
        </CustomOverlayMap>
      </div>
    </Map>
  );
}

export default React.memo(CreateKakaoMap);
