async function fetchLocalSearch() {
  // Yahoo!のアプリケーションIDを入力してください
  // const appId = "YOUR_APP_ID";
  const appId = ""; // yahoo Client IDを消去して提出
  const centerLat = document.getElementById("latitude").value;
  const centerLon = document.getElementById("longitude").value;
  const range = document.getElementById("range").value;
  const keyword = document.getElementById("keyword").value;
  const category = document.getElementById("category").value;
  const gc = document.getElementById("gc").value;

  // API URL
  const apiUrl = "https://map.yahooapis.jp/search/local/V1/localSearch";

  // パラメータ
  const params = new URLSearchParams({
    appid: appId,
    lat: centerLat,
    lon: centerLon,
    dist: range,
    query: keyword,
    category: category,
    gc: gc,
    output: "json",
  });

  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`);
    if (!response.ok) {
      throw new Error("APIリクエストに失敗しました");
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error(error);
    alert("検索中にエラーが発生しました。");
  }
}

function displayResults(data) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (!data.Feature) {
    resultsContainer.innerHTML = "<p>該当する施設が見つかりませんでした。</p>";
    return;
  }

  const results = data.Feature.map((feature) => {
    const name = feature.Name;
    const address = feature.Property.Address;
    const lat = feature.Geometry.Coordinates.split(",")[1];
    const lon = feature.Geometry.Coordinates.split(",")[0];

    return `
            <div class="result-item">
                <h3>${name}</h3>
                <p>住所: ${address}</p>
                <p>緯度: ${lat}, 経度: ${lon}</p>
            </div>
        `;
  }).join("");

  resultsContainer.innerHTML = results;
}
