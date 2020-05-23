module.exports = {
  selector(tweet) {
    const filesAndKeyword = [
      cearaHorrivel = {
        file: __dirname+'/media/ceara-horrivel.mp4',
        keywords: [
          'ceara e horrivel',
          'ceara horrivel',
        ],
        type: 'mp4'
      },
      olhaODedo = {
        file: __dirname+'/media/olha-o-dedo.mp4',
        keywords: [
          'olha o dedo',
        ],
        type: 'mp4'
      },
      teAmo = {
        file: __dirname+'/media/alan-neto2.jpeg',
        keywords: [
          'te amo',
        ],
        type: 'jpeg'
      },
      papaFortaleza = {
        file: __dirname+'/media/papa-fortaleza.mp4',
        keywords: [
          'papa fortaleza',
        ],
        type: 'mp4'
      },
      gira = {
        file: __dirname+'/media/gira.mp4',
        keywords: [
          'gira',
        ],
        type: 'mp4'
      },
      liso = {
        file: __dirname+'/media/liso.mp4',
        keywords: [
          'liso',
        ],
        type: 'mp4'
      },
      tranquilo = {
        file: __dirname+'/media/alan-neto3.jpeg',
        keywords: [
          'tranquilo',
        ],
        type: 'jpeg'
      }
    ]

    const tweetForCompare = tweet.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    let file = filesAndKeyword.filter(file => {
      let f;
      file.keywords.forEach(keyword => {
        if (tweetForCompare.indexOf(keyword) !== -1) f = file;
      })
      return f;
    })
    if (file.length < 1) file = [filesAndKeyword[2]]


    return file[0]
  }
}