import axios from 'axios'

const PROVINCE_API_URL = 'https://provinces.open-api.vn/api'

const getProvinces = async () => {
  const res = await axios.get(PROVINCE_API_URL + '/p/')
  return res.data
}

const getProvince = async (provinceCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + '/p/' + provinceCode)
  return res.data
}

const getDistricts = async (provinceCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + `/p/${provinceCode}?depth=2`)
  return res.data.districts
}

const getDistrict = async (districtCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + '/d/' + districtCode)
  return res.data
}

const getWards = async (districtCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + `/d/${districtCode}?depth=2`)
  return res.data.wards
}

const getWard = async (wardCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + '/w/' + wardCode)
  return res.data
}

export {
  getDistricts,
  getDistrict,
  getProvinces,
  getProvince,
  getWards,
  getWard,
}
