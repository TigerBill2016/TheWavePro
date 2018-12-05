// pages/personal/personal.js
import {
  HOST
} from '../../app.config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateField: '',
    startDate: '',
    endDate: '',
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    dateShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let {
      username,
      number,
      person,
      startDate,
      endDate
    } = wx.getStorageSync('guestInfo')
    this.setData({
      username,
      number,
      person,
      startDate: this.formatDate(new Date(startDate)),
      endDate: this.formatDate(new Date(endDate))
    })
  },
  getGuestField: function(a) {
    this.setData({
      [a.target.dataset.name]: a.detail
    });
  },
  showDatePicker(event) {
    let {
      name
    } = event.target.dataset
    this.setData({
      dateShow: true,
      dateField: name
    })
  },
  onDateChange(event) {
    let value = event.detail
    let {
      dateField
    } = this.data
    if (dateField === 'start') {
      this.setData({
        startDate: this.formatDate(value),
      });
    }
    if (dateField === 'end') {
      this.setData({
        endDate: this.formatDate(value),
      });
    }
    this.setData({
      dateShow: false
    })
  },
  onDateCancel() {
    this.setData({
      dateShow: false
    })
  },
  onDateClose() {
    this.setData({
      dateShow: false
    });
  },
  formatDate(date) {
    let _date = new Date(date);
    return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
  },
  getGuestInfo() {
    let {
      username,
      number,
      person,
      startDate,
      endDate
    } = this.data

    wx.setStorageSync('guestInfo', {
      username,
      number,
      person,
      startDate,
      endDate
    })

    wx.request({
      method: 'POST',
      url: HOST + "/me/updateGuestinfo",
      data: {
        username,
        number,
        person,
        startDate,
        endDate,
        guestid: wx.getStorageSync("guestid")
      },
      success: function(a) {
        console.log(a)
        if (200 === a.statusCode) {
          Toast.success(a.data);
          wx.navigateBack({
            delta: 1
          });
        }
      }
    });
  }
})