import React, { useState, useMemo, useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
} from "@material-ui/core";
import clsx from "clsx";
import Select from "react-select";

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
    display: "inline-block",
    marginBottom: 15,
  },
  imgFrame: {
    position: "relative",
    "& span": {
      display: "none",
    },
    "&:hover": {
      opacity: 0.5,
    },
    "&:hover span": {
      display: "inline-block",
      position: "absolute",
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 40,
      paddingRight: 15,
      cursor: "pointer",
      top: 0,
      right: 0,
    },
  },
}));

// begin for upload

const UploadImage = (props) => {
  const { files, setFiles, imgData, setImgData } = props;
  const classes = useStyles();
  /**
   *
   * @type {(event: React.ChangeEvent<HTMLInputElement>) => void}
   */
  const handleChange = useCallback(
    (event) => {
      let fileList = event.target.files;
      let fileListLength = fileList.length;
      if (fileListLength) {
        /**
         * @type {Promise<[string, File]>[]}
         */
        const filePromises = Array.from(fileList)
          .slice(0, Math.max(5 - files.length, 0))
          .map((file) => {
            return new Promise((resolve) => {
              const fileReader = new FileReader();
              fileReader.onloadend = (readEvent) => {
                const base64 = readEvent.target.result;
                resolve([base64, file]);
              };
              fileReader.readAsDataURL(file);
            });
          });
        Promise.all(filePromises).then((values) => {
          const newImgs = values.map((value) => value[0]);
          const newFiles = values.map((value) => value[1]);
          setFiles([...files, ...newFiles]);
          setImgData([...imgData, ...newImgs]);
        });
      }
    },
    [files, imgData]
  );

  /**
   * @type {(removeIndex: number) => void}
   */
  const removeImage = useCallback((removeIndex) => {
    setFiles(files.filter((_, fileIndex) => fileIndex !== removeIndex));
    setImgData(imgData.filter((_,imgIndex) => imgIndex !== removeIndex));
  }, [files, imgData]);

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
          );
        })}
      </GridList>
    </div>
  );
};

// end for upload

// thông tin cơ bản
const MainInfo = (props) => {
  const { formik } = props;
  const { values, touched, errors, handleChange, setFieldValue } = formik;
  const classes = useStyles();

  return (
    <>
      <Box mb={3}>
        <InputLabel htmlFor="title">Tiêu đề</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          fullWidth
          id="title"
          size="small"
          value={values.title}
          onChange={handleChange("title")}
          helperText={touched.title && errors.title}
          FormHelperTextProps={{
            className: clsx(classes.formHelperText),
          }}
        />
      </Box>
      <Box>
        <InputLabel htmlFor="address">Địa chỉ</InputLabel>
        <Box mb={2}>
          <Select
            options={[{ value: "Ha Noi", label: "Ha Noi" }]}
            value={
              values.city ? { value: values.city, label: values.city } : null
            }
            onChange={(e) => {
              setFieldValue("city", e.value);
            }}
            placeholder="Thành phố"
            style={{ width: "100%" }}
          />
          <FormHelperText className={clsx(classes.formHelperText)}>
            {touched.city && errors.city}
          </FormHelperText>
        </Box>
        <Box mb={2}>
          <Select
            options={[
              { value: "Hai Ba Trung", label: "Ha Ba Trung" },
              { value: "Cau Giay", label: "Cau Giay" },
            ]}
            value={
              values.district
                ? { value: values.district, label: values.district }
                : null
            }
            onChange={(e) => {
              setFieldValue("district", e.value);
            }}
            placeholder="Quận huyện"
            style={{ width: "100%" }}
          />
          <FormHelperText className={clsx(classes.formHelperText)}>
            {touched.district && errors.district}
          </FormHelperText>
        </Box>
        <Box mb={2}>
          <Select
            options={[
              { value: "Thanh Luong", label: "Thanh Luong" },
              { value: "Thanh Nhan", label: "Thanh Nhan" },
            ]}
            value={
              values.ward ? { value: values.ward, label: values.ward } : null
            }
            onChange={(e) => {
              setFieldValue("ward", e.value);
            }}
            placeholder="Phường xã"
            style={{ width: "100%" }}
          />
          <FormHelperText className={clsx(classes.formHelperText)}>
            {touched.ward && errors.ward}
          </FormHelperText>
        </Box>
        <Box mb={2}>
          <TextField
            type="text"
            value={values.street}
            variant="outlined"
            size="small"
            onChange={handleChange("street")}
            placeholder="Đường"
            style={{ width: "100%" }}
            helperText={touched.street && errors.street}
            FormHelperTextProps={{
              className: clsx(classes.formHelperText),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            value={values.number}
            onChange={handleChange("number")}
            type="number"
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Số nhà"
            // helperText={touched.address.number && errors.address.number}
          />
        </Box>
      </Box>
      <Box pb={3}>
        <InputLabel htmlFor="area">Diện tích</InputLabel>
        <TextField
          fullWidth
          id="area"
          value={values.area}
          onChange={handleChange("area")}
          size="small"
          variant="outlined"
          helperText={touched.area && errors.area}
          FormHelperTextProps={{
            className: clsx(classes.formHelperText),
          }}
        />
      </Box>
      <Box pb={3}>
        <InputLabel htmlFor="price">Giá</InputLabel>
        <TextField
          fullWidth
          id="price"
          value={values.price}
          onChange={handleChange("price")}
          size="small"
          variant="outlined"
          helperText={touched.price && errors.price}
          FormHelperTextProps={{
            className: clsx(classes.formHelperText),
          }}
        />
      </Box>
      <Box pb={3}>
        <InputLabel htmlFor="week">Tuần</InputLabel>
        <TextField
          fullWidth
          id="week"
          type="number"
          value={values.week}
          onChange={handleChange("week")}
          size="small"
          variant="outlined"
          helperText={touched.week && errors.week}
          FormHelperTextProps={{
            className: clsx(classes.formHelperText),
          }}
        />
      </Box>
    </>
  );
};

// cơ sở vật chất
const Furniture = (props) => {
  const { formik } = props;
  const { values, handleChange } = formik;

  return (
    <>
      <Box pb={3}>
        <Grid container>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.airConditioner}
                  onChange={handleChange("airConditioner")}
                />
              }
              label="Điều hoà"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.bathroomHeater}
                  onChange={handleChange("bathroomHeater")}
                />
              }
              label="Bình nóng lạnh"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.fridge}
                  onChange={handleChange("fridge")}
                />
              }
              label="Tủ lạnh"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const NewPost = () => {
   /**
   * @type {[File[], React.Dispatch<React.SetStateAction<File[]>>]}
   */
  const [files, setFiles] = useState([]);
  /**
   * @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]}
   */
  const [imgData, setImgData] = useState([]); // BASE64

  const newPostValidationSchema = yup.object().shape({
    title: yup
      .string()
      .max(50, "Tối đa 50 kí tự")
      .required("Không được để trống"),
    city: yup.string().nullable().required("Không được để trống"),
    district: yup.string().nullable().required("Không được để trống"),
    ward: yup.string().nullable().required("Không được để trống"),
    street: yup.string().nullable().required("Không được để trống"),
    number: yup.number().nullable().integer().required("Không được để trống"),
    area: yup.number().nullable().required("Không được để trống"),
    price: yup.number().nullable().required("Không được để trống"),
    week: yup.number().nullable().required("Không được để trống"),
    airConditioner: yup.bool().required("Không được để trống"),
    fridge: yup.bool().required("Không được để trống"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      city: void 0,
      district: void 0,
      ward: void 0,
      street: "",
      number: void 0,
      area: void 0,
      price: void 0,
      week: void 0,
      airConditioner: false,
      bathroomHeater: false,
      fridge: false,
    },
    validationSchema: newPostValidationSchema,
    onSubmit: async (values, helpers) => {
      // kiểm tra và gửi
    },
  });

  const [activeStep, setActiveStep] = useState(0);

  const steps = useMemo(() => {
    return ["Thông tin chính", "Cơ sở vật chất", "Ảnh"];
  }, []);

  const handlePrevStep = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }, [activeStep]);

  const handleNextStep = useCallback(() => {
    if (steps.length - 1 > activeStep) {
      setActiveStep(activeStep + 1);
    }
  }, [activeStep]);

  const getStepContent = useCallback(
    (step) => {
      switch (step) {
        case 0:
          return <MainInfo formik={formik} />;
        case 1:
          return <Furniture formik={formik} />;
        case 2:
          return <UploadImage files={files} setFiles={setFiles} imgData={imgData} setImgData={setImgData} />;
      }
    },
    [activeStep, formik]
  );

  const getStepButtons = useCallback(
    (step) => {
      switch (step) {
        case 0:
          return (
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNextStep()}
              >
                Tiếp theo
              </Button>
            </Box>
          );
        case 1:
          return (
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePrevStep}
              >
                Quay lại
              </Button>
              &nbsp;
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStep}
              >
                Tiếp theo
              </Button>
            </Box>
          );
        case 2:
          return (
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePrevStep}
              >
                Quay lại
              </Button>
              &nbsp;
              <Button
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
              >
                Hoàn tất
              </Button>
            </Box>
          );
        default:
          return null;
      }
    },
    [activeStep]
  );

  return (
    <Container maxWidth="sm">
      <h3 style={{ marginTop: 15 }}>New Post</h3>
      <Stepper activeStep={activeStep}>
        {steps.map((label, stepIndex) => {
          return (
            <Step key={stepIndex}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {getStepContent(activeStep)}
      {getStepButtons(activeStep)}
    </Container>
  );
};

export default NewPost;
