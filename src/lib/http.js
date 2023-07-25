import { useUserStore } from "../store/user";
const host = "http://101.34.142.175:39101"; // 笔记本服务器

// if api in the white_list, then request will not try to get user info.
const WHITE_LIST = ["/wxapp/auth/login"];

export async function request(body, resolve = true) {
  const { getUserId, getToken } = useUserStore();
  const result = await uni.request({
    method: body.method || "GET",
    header: {
      "User-Id": inWhiteList(body) ? "" : await getUserId(),
      Token: inWhiteList(body) ? "" : await getToken(),
      ...body.headers,
    },
    url: getUrl(body),
    data: getData(body),
  });
  if (resolve) {
    return handleReqeust(result);
  } else {
    return result;
  }
}

export async function uploadFile(body) {
  const { getUserId, getToken } = useUserStore();
  console.log(inWhiteList(body), getToken());
  const result = await uni.uploadFile({
    method: body.method || "POST",
    header: {
      accept: "application/json",
      "Content-Type": "multipart/form-data",
      "User-Id": inWhiteList(body) ? "" : await getUserId(),
      Token: inWhiteList(body) ? "" : await getToken(),
    },
    filePath: body.file_path,
    url: getUrl(body),
    name: body.name || "files",
  });
  if (typeof result.data == "string") {
    result.data = JSON.parse(result.data);
  }
  return handleReqeust(result);
}

function inWhiteList(body) {
  // console.log("body", body);
  return WHITE_LIST.some((item) => {
    if (body.url.includes(item)) {
      return true;
    }
  });
}

function getUrl(body) {
  let url;
  if (body.url.includes("https://")) {
    url = body.url;
  } else {
    url = `${host}${body.url}`;
  }
  if (body.data && (!body.method || body.method.toLowerCase() == "get")) {
    const query_string = formatQuery(body.data);
    if (query_string) {
      url = `${url}?${query_string}`;
    }
  }
  // console.log("url", url);
  return url;
}

function formatQuery(queries) {
  let query_list = [];
  for (let key in queries) {
    if (queries[key] === "" || queries[key] === undefined) continue;
    query_list.push(`${key}=${queries[key]}`);
  }
  return query_list.join("&");
}

function handleReqeust(result) {
  if (result.data.code == 200) {
    return result.data.data || {};
  } else {
    uni.showToast({ title: result.data.msg, icon: "none" });
    return {
      msg: result.data.msg,
      err_code: result.data.code,
    };
  }
}

function getData(body) {
  if (body.method && body.method.toLowerCase() == "post") {
    return body.data;
  } else {
    return null;
  }
}
