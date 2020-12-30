import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  InputLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Grid,
  CircularProgress,
  Container,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  GridList,
  GridListTile,
} from '@material-ui/core'
import clsx from 'clsx'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles((theme) => ({
  formHelperText: {
    marginLeft: 0,
    color: theme.palette.error.main,
  },
  gridlist: {
    width: 600,
    paddingBottom: 15,
  },
  btn: {
    display: 'inline-block',
    marginBottom: 15,
  },
  imgFrame: {
    position: 'relative',
    '& span': {
      display: 'none',
    },
    '&:hover': {
      opacity: 0.5,
    },
    '&:hover span': {
      display: 'inline-block',
      position: 'absolute',
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 40,
      paddingRight: 15,
      cursor: 'pointer',
      top: 0,
      right: 0,
    },
  },
}))

// begin for upload

const UploadImage = (props) => {
  let { files, setFiles, imgData, setImgData, updateListAvatar} = props
  console.log('files in upload: ', files)
  const classes = useStyles()
  /**
   *
   * @type {(event: React.ChangeEvent<HTMLInputElement>) => void}
   */
  const handleChange = useCallback(
    (event) => {
      let fileList = event.target.files
      let fileListLength = fileList.length
      if (fileListLength) {
        /**
         * @type {Promise<[string, File]>[]}
         */
        const filePromises = Array.from(fileList)
          .slice(0, Math.max(5 - files.length, 0))
          .map((file) => {
            return new Promise((resolve) => {
              const fileReader = new FileReader()
              fileReader.onloadend = (readEvent) => {
                const base64 = readEvent.target.result
                resolve([base64, file])
              }
              fileReader.readAsDataURL(file)
            })
          })
        Promise.all(filePromises).then((values) => {
          const newImgs = values.map((value) => value[0])
          const newFiles = values.map((value) => value[1])
          setFiles([...files, ...newFiles])
          setImgData([...imgData, ...newImgs])
        })
        console.log('file after load: ', files)
        if(files.length > 0){
          updateListAvatar(files)
        }
      }
    },
    [files, imgData]
  )

  /**
   * @type {(removeIndex: number) => void}
   */
  const removeImage = useCallback(
    (removeIndex) => {
      setFiles(files.filter((_, fileIndex) => fileIndex !== removeIndex))
      setImgData(imgData.filter((_, imgIndex) => imgIndex !== removeIndex))
    },
    [files, imgData]
  )

  return (
    <div>
      <label>
        <input type="file" multiple={true} min={3} max={5} onChange={handleChange} />
      </label>
      <GridList className={classes.gridlist} cols={2}>
        {imgData.map((img, imgIndex) => {
          return (
            <GridListTile key={imgIndex} cols={1} className={classes.imgFrame}>
              <img src={img} alt="" />
              <span onClick={() => removeImage(imgIndex)}>&times;</span>
            </GridListTile>
          )
        })}
      </GridList>
    </div>
  )
}

// end for upload

// thông tin cơ bản
const MainInfo = (props) => {
  const {
    formik,
    listCity,
    setListCity,
    listDistrict,
    setListDistrict,
    listWard,
    setListWard,
    listPublicLocation,
    setListPublicLocation,
  } = props
  const { values, touched, errors, handleChange, setFieldValue } = formik
  const classes = useStyles()

  let [selectedCity, setSelectedCity] = useState()
  let [selectedDistrict, setSelectedDistrict] = useState()
  let [selectedWard, setSelectedWard] = useState()
  let [selectedLocation, setSelectedLocation] = useState()

  return (
    <>
      {/* Title */}
      <Box mb={3}>
        <InputLabel htmlFor="title">Tiêu đề</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          fullWidth
          id="title"
          size="small"
          value={values.title}
          onChange={handleChange('title')}
          helperText={touched.title && errors.title}
          FormHelperTextProps={{
            className: clsx(classes.formHelperText),
          }}
        />
      </Box>
      {/* Address */}
      <Box>
        <InputLabel htmlFor="address">Địa chỉ</InputLabel>
        <Box mb={2}>
          <Select
            options={listCity}
            value={selectedCity}
            onChange={async (e) => {
              setSelectedCity(e)
              setFieldValue('city', e.value)
              await axios.get(`https://thongtindoanhnghiep.co/api/city/${e.ID}/district`).then(async (res) => {
                let listDistrict = await res.data.map((item) => {
                  return {
                    ID: item.ID,
                    type: 'district',
                    value: item.Title.replace(/Quận |Huyện |Thị Xã |Thành Phố |District |Phường /g, ''),
                    label: item.Title,
                  }
                })
                setListDistrict(listDistrict)
              })
            }}
            placeholder={'Thành phố'}
            style={{ width: '100%' }}
          />
          <FormHelperText className={clsx(classes.formHelperText)}>{touched.city && errors.city}</FormHelperText>
        </Box>
        <Box mb={2}>
          <Select
            options={listDistrict}
            value={selectedDistrict}
            onChange={async (e) => {
              setSelectedDistrict(e)
              setFieldValue('district', e.value)
              await axios.get(`https://thongtindoanhnghiep.co/api/district/${e.ID}/ward`).then(async (res) => {
                let listWard = await res.data.map((item) => {
                  return {
                    ID: item.ID,
                    type: 'ward',
                    value: item.Title.replace(/Quận |Huyện |Thị Xã |Thành Phố |District |Phường /g, ''),
                    label: item.Title,
                  }
                })
                setListWard(listWard)
              })
            }}
            placeholder="Quận huyện"
            style={{ width: '100%' }}
          />
          <FormHelperText className={clsx(classes.formHelperText)}>
            {touched.district && errors.district}
          </FormHelperText>
        </Box>
        <Box mb={2}>
          <Select
            options={listWard}
            value={selectedWard}
            onChange={async (e) => {
              setSelectedWard(e)
              setFieldValue('ward', e.value)
            }}
            placeholder={'Phường xã'}
            style={{ width: '100%' }}
          />
          <FormHelperText className={clsx(classes.formHelperText)}>{touched.ward && errors.ward}</FormHelperText>
        </Box>
        <Box mb={2}>
          <TextField
            type="text"
            value={values.street}
            variant="outlined"
            size="small"
            onChange={handleChange('street')}
            placeholder="Đường"
            style={{ width: '100%' }}
            helperText={touched.street && errors.street}
            FormHelperTextProps={{
              className: clsx(classes.formHelperText),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            value={values.number}
            onChange={handleChange('number')}
            type="number"
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Số nhà"
            // helperText={touched.address.number && errors.address.number}
          />
        </Box>
      </Box>
      {/* Public Place */}
      <Box pb={3}>
        <CreatableSelect
          options={listPublicLocation}
          value={selectedLocation}
          onChange={async (e) => {
            setSelectedLocation(e)
            setFieldValue('publicPlace', e.value)
          }}
          placeholder={'Gần địa điểm công cộng'}
          style={{ width: '100%' }}
        />
        <FormHelperText className={clsx(classes.formHelperText)}>{touched.ward && errors.ward}</FormHelperText>
      </Box>
      {/* Living Area */}
      <Box pb={3}>
        <InputLabel htmlFor="livingArea">Diện tích</InputLabel>
        <TextField
          fullWidth
          id="livingArea"
          value={values.livingArea}
          onChange={handleChange('livingArea')}
          size="small"
          type="number"
          variant="outlined"
          helperText={touched.livingArea && errors.livingArea}
          FormHelperTextProps={{
            className: clsx(classes.formHelperText),
          }}
        />
      </Box>
      {/* Accommodation Type */}
      <Box mb={3}>
        <Select
          options={[
            { value: 'Phòng trọ', label: 'Phòng trọ' },
            { value: 'Chung cư mini', label: 'Chung cư mini' },
            { value: 'Nhà nguyên căn', label: 'Nhà nguyên căn' },
            { value: 'Chung cư nguyên căn', label: 'Chung cư nguyên căn' },
          ]}
          value={values.accommodationType ? { value: values.accommodationType, label: values.accommodationType } : null}
          onChange={(e) => {
            setFieldValue('accommodationType', e.value)
          }}
          placeholder="Loại nhà cho thuê"
          style={{ width: '100%' }}
        />
        <FormHelperText className={clsx(classes.formHelperText)}>
          {touched.accommodationType && errors.accommodationType}
        </FormHelperText>
      </Box>
      {/* Price */}
      <Box pb={3}>
        <InputLabel htmlFor="price">Giá</InputLabel>
        <TextField
          fullWidth
          id="price"
          value={values.price}
          onChange={handleChange('price')}
          type="number"
          size="small"
          variant="outlined"
        />
      </Box>
      {/* Time to live */}
      <Box pb={3}>
        <InputLabel htmlFor="week">Tuần</InputLabel>
        <TextField
          fullWidth
          id="week"
          type="number"
          value={values.week}
          onChange={handleChange('week')}
          size="small"
          variant="outlined"
          helperText={touched.week && errors.week}
          FormHelperTextProps={{
            className: clsx(classes.formHelperText),
          }}
        />
      </Box>
    </>
  )
}

// cơ sở vật chất
const Furniture = (props) => {
  const { formik } = props
  const { values, handleChange, touched, setFieldValue } = formik
  const classes = useStyles()
  return (
    <>
      <Box pb={3}>
        <Grid container>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={values.seperateAccomod} onChange={handleChange('seperateAccomod')} />}
              label="Chung chủ"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={values.bathroom} onChange={handleChange('bathroom')} />}
              label="Phòng tắm"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={values.airConditioner} onChange={handleChange('airConditioner')} />}
              label="Điều hoà"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={values.electricWaterHeater} onChange={handleChange('electricWaterHeater')} />}
              label="Bình nóng lạnh"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={values.bedroom} onChange={handleChange('bedroom')} />}
              label="Phòng ngủ"
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={values.balcony} onChange={handleChange('balcony')} />}
              label="Ban công"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={values.washingMachine} onChange={handleChange('washingMachine')} />}
              label="Máy giặt"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={values.fridge} onChange={handleChange('fridge')} />}
              label="Tủ lạnh"
            />
          </Grid>
          <Grid item xs={6}>
            <Box mb={2}>
              <InputLabel htmlFor="kitchen">Bếp</InputLabel>
              <Select
                options={[
                  { label: 'Không có bếp', value: 'Không có bếp' },
                  { label: 'Bếp chung', value: 'Bếp chung' },
                  { label: 'Bếp riêng', value: 'Bếp riêng' },
                ]}
                value={values.kitchen ? { value: values.kitchen, label: values.kitchen } : null}
                onChange={(e) => {
                  setFieldValue('kitchen', e.value)
                }}
                placeholder="Bếp"
                style={{ width: '100%' }}
              />
              <FormHelperText className={clsx(classes.formHelperText)}>{touched.ward && errors.ward}</FormHelperText>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box width="100%" mb={3} mu={3}>
              <InputLabel htmlFor="waterPrice">Giá nước</InputLabel>
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                id="waterPrice"
                size="small"
                value={values.waterPrice}
                onChange={handleChange('waterPrice')}
                helperText={touched.title && errors.title}
                FormHelperTextProps={{
                  className: clsx(classes.formHelperText),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box width="100%" mu={3}>
              <InputLabel htmlFor="electricityPrice">Giá điện</InputLabel>
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                id="electricityPrice"
                size="small"
                value={values.electricityPrice}
                onChange={handleChange('electricityPrice')}
                helperText={touched.title && errors.title}
                FormHelperTextProps={{
                  className: clsx(classes.formHelperText),
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

const NewPost = (props) => {
  /**
   * @type {[File[], React.Dispatch<React.SetStateAction<File[]>>]}
   */
  const [files, setFiles] = useState([])
  /**
   * @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]}
   */

   const {updateListAvatar, listAvatar} = props
  const [imgData, setImgData] = useState([]) // BASE64

  const [listCity, setListCity] = useState([])
  const [listDistrict, setListDistrict] = useState([])
  const [listWard, setListWard] = useState([])
  const [listPublicLocation, setListPublicLocation] = useState([])

  useEffect(() => {
    axios.get(`https://thongtindoanhnghiep.co/api/city`).then(async (res) => {
      const cities = await res.data.LtsItem.map((item) => {
        return {
          ID: item.ID,
          type: 'city',
          value: item.Title.replace(/Quận |Huyện |Thị Xã |Thành Phố |District |Phường /g, ''),
          label: item.Title,
        }
      })
      setListCity(cities)
    })
    axios.get(`https://accommodation-finder.herokuapp.com/location`).then(async (res) => {
      if (res.data.length !== 0) {
        const listPlace = await res.data.map((l) => {
          return { value: l.name, label: l.name }
        })
        setListPublicLocation(listPlace)
      }
    })
  }, [])

  const handleSubmit = async (values, newfiles) => {
    toast.info('Đã gửi yêu cầu đăng bài', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    // console.log(files)
    // console.log(values)
    // var photos = []
    // var ImgData = new FormData()
    // await Promise.all(
    //   files.map(async (f) => {
    //     ImgData.append('image', f)
    //     var config = {
    //       method: 'post',
    //       url: 'https://api.imgur.com/3/image',
    //       headers: {
    //         Authorization: 'Client-ID 546c25a59c58ad7',
    //         Accept: '*/*',
    //       },
    //       data: ImgData,
    //     }
    //     await axios(config).then((res) => {
    //       photos.push(res.data.data.link)
    //     })
    //   })
    // )
    // console.log(photos)
    var photos = ['https://www.wellingtonnz.com/assets/Uploads/Intros/Intercontinental_room-couches-view__FocusFillWzk2MCw1MzYsInkiLDkxXQ.jpg',
    'https://www.canterbury.ac.nz/life/accommodation/temporary/Sonoda-Temp-accom_127832166035890251.jpg',
    'https://pix10.agoda.net/hotelImages/747/7476707/7476707_19053021300074837521.jpg?s=1024x768'
  ]

    const data = {
      _id: props.userData._id,
      name: props.userData.name,
      phoneNumber: props.userData.phoneNumber,
      accomodInfo: {
        houseNumber: parseInt(values.number),
        street: values.street,
        ward: values.ward,
        district: values.district,
        city: values.city,
        publicPlace: values.publicPlace,
        accommodationType: values.accommodationType,
        price: values.price,
        seperateAccommodation: values.seperateAccomod,
        livingArea: values.livingArea,
        photos: values.photos,
        timeToLive: values.week,
        title: values.title,
        photos: photos,
      },
      facilitiesInfo: {
        bathroom: { seperate: values.bathroom, amount: 1 },
        bedroom: values.bedroom,
        electricWaterHeater: values.electricWaterHeater,
        kitchen: values.kitchen,
        airConditioner: values.airConditioner,
        balcony: values.balcony,
        waterPrice: values.waterPrice,
        electricityPrice: values.electricityPrice,
        washingMachine: values.washingMachine,
        fridge: values.fridge,
      },
    }
    axios({
      method: 'POST',
      url: `https://accommodation-finder.herokuapp.com/accommodation/newAccomod`,
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res)
        toast.success('Bài viết đã được gửi. Vui lòng chờ duyệt', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        // location.href='/home'
      })
      .catch((e) => {
        console.log(e.data.response)
      })
    console.log('data: ', data)
  }
  const newPostValidationSchema = yup.object().shape({
    title: yup.string().max(50, 'Tối đa 50 kí tự').required('Không được để trống'),
    city: yup.string().nullable().required('Không được để trống'),
    district: yup.string().nullable().required('Không được để trống'),
    ward: yup.string().nullable().required('Không được để trống'),
    publicPlace: yup.string().nullable().required('Không được để trống'),
    street: yup.string().nullable().required('Không được để trống'),
    number: yup.string().nullable().required('Không được để trống'),
    livingArea: yup.string().required('Không được để trống'),
    accommodationType: yup.string().nullable().required('Không được để trống'),
    price: yup.string().required('Không được để trống'),
    week: yup.number().nullable().required('Không được để trống'),

    seperateAccomod: yup.bool().required('Không được để trống'),
    bathroom: yup.bool().required('Không được để trống'),
    airConditioner: yup.bool().required('Không được để trống'),
    electricWaterHeater: yup.bool().required('Không được để trống'),
    bedroom: yup.bool().required('Không được để trống'),
    kitchen: yup.string().required('Không được để trống'),
    balcony: yup.bool().required('Không được để trống'),
    washingMachine: yup.bool().required('Không được để trống'),
    fridge: yup.bool().required('Không được để trống'),
    waterPrice: yup.bool().required('Không được để trống'),
    electricityPrice: yup.bool().required('Không được để trống'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      city: void 0,
      district: void 0,
      ward: void 0,
      publicPlace: '',
      street: '',
      number: '',
      livingArea: '',
      accommodationType: '',
      price: '',
      week: '',

      seperateAccomod: false,
      bathroom: false,
      airConditioner: false,
      electricWaterHeater: false,
      bedroom: false,
      kitchen: '',
      balcony: false,
      washingMachine: false,
      fridge: false,
      waterPrice: '',
      electricityPrice: '',
    },
    validationSchema: newPostValidationSchema,
    onSubmit: (values, helpers) => {
      // kiểm tra và gửi
      console.log(values)
    },
  })

  const [activeStep, setActiveStep] = useState(0)

  const steps = useMemo(() => {
    return ['Thông tin chính', 'Cơ sở vật chất', 'Ảnh']
  }, [])

  const handlePrevStep = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }, [activeStep])

  const handleNextStep = useCallback(() => {
    if (steps.length - 1 > activeStep) {
      setActiveStep(activeStep + 1)
    }
  }, [activeStep])

  const getStepContent = useCallback(
    (step) => {
      switch (step) {
        case 0:
          return (
            <MainInfo
              formik={formik}
              listCity={listCity}
              setListCity={setListCity}
              listDistrict={listDistrict}
              setListDistrict={setListDistrict}
              listWard={listWard}
              setListWard={setListWard}
              listPublicLocation={listPublicLocation}
              setListPublicLocation={setListPublicLocation}
            />
          )
        case 1:
          return <Furniture formik={formik} />
        case 2:
          return <UploadImage files={files} setFiles={setFiles} imgData={imgData} setImgData={setImgData} updateListAvatar={updateListAvatar}/>
      }
    },
    [activeStep, formik]
  )

  const getStepButtons = useCallback(
    (step) => {
      switch (step) {
        case 0:
          return (
            <Box>
              <Button variant="contained" color="primary" onClick={() => handleNextStep()}>
                Tiếp theo
              </Button>
            </Box>
          )
        case 1:
          return (
            <Box>
              <Button variant="outlined" color="primary" onClick={handlePrevStep}>
                Quay lại
              </Button>
              &nbsp;
              <Button variant="contained" color="primary" onClick={handleNextStep}>
                Tiếp theo
              </Button>
            </Box>
          )
        case 2:
          return (
            <Box>
              <Button variant="outlined" color="primary" onClick={handlePrevStep}>
                Quay lại
              </Button>
              &nbsp;
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
                onClick={() => handleSubmit(formik.values, files)}
              >
                Hoàn tất
              </Button>
            </Box>
          )
        default:
          return null
      }
    },
    [activeStep]
  )

  return (
    <Container maxWidth="sm">
      <h3 style={{ marginTop: 15 }}>New Post</h3>
      <Stepper activeStep={activeStep}>
        {steps.map((label, stepIndex) => {
          return (
            <Step key={stepIndex}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {getStepContent(activeStep)}
      {getStepButtons(activeStep)}
    </Container>
  )
}

export default NewPost
