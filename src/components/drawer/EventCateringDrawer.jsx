import React from 'react';
import { Input, Textarea, Select } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { SidebarContext } from '@/context/SidebarContext';
import { notifySuccess, notifyError } from '@/utils/toast';
import DrawerButton from '@/components/form/button/DrawerButton';
import LabelArea from '@/components/form/selectOption/LabelArea';
import Error from '@/components/form/others/Error';
import Title from '@/components/form/others/Title';
import useAxiosPublic from '@/hooks/useAxiosPublic';

const EventCateringDrawer = ({ id, refetchData }) => {
  const { toggleDrawer } = useContext(SidebarContext);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('subtitle', data.subtitle);
      formData.append('description', data.description);
      formData.append('capacity', data.capacity);
      formData.append('eventDate', data.eventDate);
      formData.append('eventTime', data.eventTime);
      formData.append('price', data.price);
      formData.append('status', data.status);
      
      if (data.image[0]) {
        formData.append('image', data.image[0]);
      }
      console.log(data);

      const res = await axiosPublic.post("/events/add?type=events", formData);
      if (res.status=== 201) {
        notifySuccess('Event saved successfully!');
        refetchData();
        toggleDrawer();
        clearErrors();
      } else {
        notifyError('Something went wrong!');
      }
    } catch (error) {
      notifyError('Something went wrong!');
      console.error('Error saving event:', error);
    }
  };

  return (
    <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
      <Title title={id ? 'Update Event' : 'Add Event'} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Event Title" />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register('title', {
                  required: 'Title is required!',
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white"
                placeholder="Event Title"
              />
              <Error errorName={errors.title} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Subtitle" />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register('subtitle', {
                  required: 'Subtitle is required!',
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white"
                placeholder="Event Subtitle"
              />
              <Error errorName={errors.subtitle} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Description" />
            <div className="col-span-8 sm:col-span-4">
              <Textarea
                {...register('description', {
                  required: 'Description is required!',
                })}
                className="border text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white"
                rows="4"
                placeholder="Event Description"
              />
              <Error errorName={errors.description} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Capacity" />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register('capacity', {
                  required: 'Capacity is required!',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Capacity must be a number!',
                  },
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white"
                placeholder="Event Capacity"
                type="number"
              />
              <Error errorName={errors.capacity} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Event Date" />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register('eventDate', {
                  required: 'Event date is required!',
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white"
                type="date"
              />
              <Error errorName={errors.eventDate} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Event Time" />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register('eventTime', {
                  required: 'Event time is required!',
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white"
                type="time"
              />
              <Error errorName={errors.eventTime} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Price" />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register('price', {
                  required: 'Price is required!',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Price must be a valid number!',
                  },
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white"
                placeholder="Event Price"
                type="number"
                step="0.01"
              />
              <Error errorName={errors.price} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Image" />
            <div className="col-span-8 sm:col-span-4">
              <Input
                {...register('image', {
                  required: !id ? 'Image is required!' : false,
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white"
                type="file"
                accept="image/*"
              />
              <Error errorName={errors.image} />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label="Status" />
            <div className="col-span-8 sm:col-span-4">
              <Select
                {...register('status', {
                  required: 'Status is required!',
                })}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </Select>
              <Error errorName={errors.status} />
            </div>
          </div>
        </div>

        <DrawerButton id={id} title="Event" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default EventCateringDrawer;