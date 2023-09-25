var express = require('express');

export default function handler(req, res) {
  res.status(200).json({ text: 'Hi guys api endpoints work now :)' });
}