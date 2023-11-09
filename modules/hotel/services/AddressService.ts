import axios from 'axios'

const PROVINCE_API_URL = 'https://provinces.open-api.vn/api'

export const searchProvinces = async (provinceName: string) => {
  const res = await axios.get(PROVINCE_API_URL + '/p/search/?q=' + provinceName)
  return res.data
}

export const getProvinces = async () => {
  const res = await axios.get(PROVINCE_API_URL + '/p/')
  return res.data
}

export const getProvince = async (provinceCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + '/p/' + provinceCode)
  return res.data
}

export const getDistricts = async (provinceCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + `/p/${provinceCode}?depth=2`)
  return res.data.districts
}

export const getDistrict = async (districtCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + '/d/' + districtCode)
  return res.data
}

export const getWards = async (districtCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + `/d/${districtCode}?depth=2`)
  return res.data.wards
}

export const getWard = async (wardCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + '/w/' + wardCode)
  return res.data
}
