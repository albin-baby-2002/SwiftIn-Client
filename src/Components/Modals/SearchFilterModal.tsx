import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import Modal from "./ParentModal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { SINGLE_LISTING_ADDRESS_UPDATE_URL } from "../../Api/EndPoints";
import useEditListingsModal from "../../Hooks/zustandStore/useEditListingsModal";

import Input from "../Inputs/Input";
import useSearchModal from "../../Hooks/zustandStore/useSearchFilterModal";
import { useSearchParams } from "react-router-dom";
import useSearchState from "../../Hooks/zustandStore/useSearchState";

interface TSearchFilterModalProps {
  reFetchData: () => void;
}

const SearchFilterModal: React.FC<TSearchFilterModalProps> = () => {
  const searchModalState = useSearchModal();
  const searchState = useSearchState();

  const handleRoomChange = (rooms: number) => {
    searchState.setRooms(rooms);
  };
  const handleGuestsChange = (guests: number) => {
    searchState.setGuests(guests);
  };
  const bodyContent = (
    <div className=" py-5 ">
      <p className="  font-semibold">Enter The Destination</p>

      <input
        type="text"
        className=" mt-6 w-full rounded-md border-2 border-gray-500 px-2  py-2 text-sm  outline-none "
        placeholder=" state or district or city"
        value={searchState.destination}
        onChange={(e) => {
          searchState.setDestination(e.target.value);
        }}
      />

      <p className=" mt-7 font-semibold">How Many Room You need ?</p>

      <div className=" mt-7 flex gap-2 text-sm sm:gap-3">
        <p
          className={`${searchState.rooms === 1 ? "  border-black bg-black/10  " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleRoomChange(1);
          }}
        >
          1
        </p>
        <p
          className={`${searchState.rooms === 2 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleRoomChange(2);
          }}
        >
          2
        </p>
        <p
          className={`${searchState.rooms === 3 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleRoomChange(3);
          }}
        >
          3
        </p>
        <p
          className={`${searchState.rooms === 4 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleRoomChange(4);
          }}
        >
          4
        </p>
        <p
          className={`${searchState.rooms === 5 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleRoomChange(5);
          }}
        >
          5
        </p>
        <p
          className={`${searchState.rooms === 6 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleRoomChange(6);
          }}
        >
          6
        </p>
        <p
          className={`${searchState.rooms > 6 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleRoomChange(7);
          }}
        >
          6 +
        </p>
      </div>

      <p className=" mt-7 font-semibold">
        How many people do you expect the room to accommodate?
      </p>

      <div className=" mt-7 flex gap-2 text-sm sm:gap-3">
        <p
          className={`${searchState.guests === 1 ? "  border-black bg-black/10  " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleGuestsChange(1);
          }}
        >
          1
        </p>
        <p
          className={`${searchState.guests === 2 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleGuestsChange(2);
          }}
        >
          2
        </p>
        <p
          className={`${searchState.guests === 3 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleGuestsChange(3);
          }}
        >
          3
        </p>
        <p
          className={`${searchState.guests === 4 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleGuestsChange(4);
          }}
        >
          4
        </p>
        <p
          className={`${searchState.guests === 5 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleGuestsChange(5);
          }}
        >
          5
        </p>
        <p
          className={`${searchState.guests === 6 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleGuestsChange(6);
          }}
        >
          6
        </p>
        <p
          className={`${searchState.guests > 6 ? "  border-2 border-black bg-black/10   " : " border-gray-500"} cursor-pointer rounded-md border-2 px-3 py-[2px]`}
          onClick={() => {
            handleGuestsChange(7);
          }}
        >
          6 +
        </p>
      </div>
      <p className=" mt-7 font-semibold">How to sort Hotels ? </p>

      <div className=" mt-6 flex justify-between gap-4  text-sm">
        <div
          className={`${searchState.sortBy === "highToLow" ? "  border-2 border-black bg-black/10   " : " border-gray-500"}  flex w-1/2 cursor-pointer items-center justify-center rounded-md border-2  border-gray-500 px-2 py-2 font-Sen`}
          onClick={() => {
            searchState.setSortBy("highToLow");
          }}
        >
          {" "}
          <p> High Price To Low</p>
        </div>

        <div
          className={`${searchState.sortBy === "lowToHigh" ? "  border-2 border-black bg-black/10   " : " border-gray-500"}  flex w-1/2 cursor-pointer items-center justify-center rounded-md border-2  border-gray-500 px-2 py-2 font-Sen`}
          onClick={() => {
            searchState.setSortBy("lowToHigh");
          }}
        >
          {" "}
          <p> Low Price To High</p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Filter And Search"
      onClose={searchModalState.onClose}
      onSubmit={() => {
        searchModalState.onClose();
      }}
      isOpen={searchModalState.isOpen}
      body={bodyContent}
    />
  );
};

export default SearchFilterModal;
